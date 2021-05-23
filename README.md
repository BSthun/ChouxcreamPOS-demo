# CSC105 Chouxcream POS

Chouxcream POS demo (as a simple POS system for CSC105 assignment)

## Deployment preview

Deployment preview available at **https://dp-chxpos.bsthun.com**.

## Status

[![Deployment Preview CI](https://github.com/BSthun/ChouxcreamPOS-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/BSthun/ChouxcreamPOS-demo/actions/workflows/ci.yml)

## Secret variables

To encrypt:
`sops -e ./spring/src/main/resources/variables.yml > ./spring/src/main/resources/variables.sops.yml`

To decrypt:
`sops -d ./spring/src/main/resources/variables.sops.yml > ./spring/src/main/resources/variables.yml`

## Credit

- Developed by **[BSthun](https://www.bsthun.com)**
