#!/bin/bash


set -Eeuo pipefail

function mount_file() {
  echo Mount $1 to $2

  SRC="$1"
  DST="$2"

  rm -rf "${DST}"

  if [ ! -f "${SRC}" ]; then 
    mkdir -pv "${SRC}"
  fi

  mkdir -pv "$(dirname "${DST}")"
  
  ln -sT "${SRC}" "${DST}"
}


NAS_DIR="/mnt/ac-ui"

# 内置模型准备
# 如果挂载了 NAS，软链接到 NAS 中
# 如果未挂载 NAS，则尝试直接将内置模型过载
NAS_MOUNTED=0
if [ -d $NAS_DIR ]; then
  NAS_MOUNTED=1
fi

if [ "$NAS_MOUNTED" == "0" ]; then
  echo "start agentcraft ui"
  npm start
else
  
  find ${NAS_DIR} | while read -r file; do
    SRC="${file}"
    DST="${NAS_DIR}/${file#$ROOT/}"

    if [ ! -e "$DST" ] && [ ! -d "$SRC" ]; then
      mount_file "$SRC" "$DST"
    fi
  done
  npm run dev
fi




