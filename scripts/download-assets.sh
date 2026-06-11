#!/usr/bin/env bash
# Downloads official JETOUR media from jetourglobal.com into public/images.
# Polite pacing + retries because the Alibaba CDN drops rapid-fire requests.
set -u
BASE="https://www.jetourglobal.com"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0 Safari/537.36"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMG="$ROOT/public/images"
FAIL=0

dl() { # dl <url-path> <dest>
  local url="$BASE$1" dest="$2"
  mkdir -p "$(dirname "$dest")"
  [ -s "$dest" ] && return 0
  for attempt in 1 2 3 4; do
    curl -s --max-time 60 -A "$UA" -e "$BASE/" -o "$dest" "$url" && [ -s "$dest" ] && return 0
    sleep $((attempt * 3))
  done
  echo "FAILED: $url"
  rm -f "$dest"
  FAIL=$((FAIL+1))
  return 1
}

# --- 1. Transparent profile cutouts (all 9 models) ---
for m in g700 T1 T1iDM T2 T2iDM dashing x70 x70Plus x90Plus; do
  case "$m" in
    g700) slug=g700;; T1) slug=t1;; T1iDM) slug=t1-idm;; T2) slug=t2;;
    T2iDM) slug=t2-idm;; dashing) slug=dashing;; x70) slug=x70;;
    x70Plus) slug=x70-plus;; x90Plus) slug=x90-plus;;
  esac
  dl "/new-static/images/vehicles/image/$m.png" "$IMG/cutouts/$slug.png"
  sleep 0.6
done

# --- 2. 360-degree turntable frames: T2 night_black + G700 white (hero cars) ---
for n in $(seq -w 0 35); do
  dl "/new-static/exterior/T2/night_black/$n.png" "$IMG/360/t2/$n.png"
  sleep 0.4
done
for n in $(seq -w 0 35); do
  dl "/new-static/exterior/g700/white/$n.png" "$IMG/360/g700/$n.png"
  sleep 0.4
done

# --- 3. Beauty side-profile exterior frames (one per model, as referenced on their pages) ---
declare -A PROFILES=(
  [t1]="/new-static/exterior/T1/green/07.png"
  [t1-idm]="/new-static/exterior/T1iDM/gold/07.png"
  [t2]="/new-static/exterior/T2/night_black/23.png"
  [t2-idm]="/new-static/exterior/T2iDM/silver_snow/23.png"
  [dashing]="/new-static/exterior/dashing/white/11.png"
  [x70]="/new-static/exterior/x70/white/19.png"
  [x70-plus]="/new-static/exterior/x70Plus/white/17.png"
  [x90-plus]="/new-static/exterior/x90Plus/white/13.png"
  [g700]="/new-static/exterior/g700/white/11.png"
)
for slug in "${!PROFILES[@]}"; do
  dl "${PROFILES[$slug]}" "$IMG/profiles/$slug.png"
  sleep 0.6
done

# --- 4. Gallery / lifestyle images harvested from model pages ---
while IFS= read -r path; do
  rel="${path#/new-static/images/}"
  case "$rel" in
    vehicles/cars/*) dest="$IMG/gallery/${rel#vehicles/cars/}";;
    home/*)          dest="$IMG/lifestyle/${rel#home/}";;
    *)               dest="$IMG/misc/$rel";;
  esac
  dl "$path" "$dest"
  sleep 0.4
done < /tmp/jetour/gallery_urls.txt

# --- 5. 3D hall stage backgrounds ---
dl "/new-static/images/vehicles/3d-hall/bg-exterior.png" "$IMG/360/stage-bg.png"
dl "/new-static/images/vehicles/3d-hall/soild.png" "$IMG/360/stage-floor.png"

echo "DONE. failures=$FAIL"
find "$IMG" -type f | wc -l
