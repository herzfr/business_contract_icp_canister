# Business Contract ICP Canisters

Welcome to your first Azle project! This example project will help you to deploy your first canister (application) to the Internet Computer (IC) decentralized cloud. It is a simple getter/setter canister. You can always refer to [The Azle Book](https://demergent-labs.github.io/azle/) for more in-depth documentation.

This is my first Azle Project ICP Canister, this project replicates decentralized cooperation between two parties, starting from the one proposing work/collaboration to the other party that approves the work/collaboration

## Installation

dfx is the tool you will use to interact with the IC locally and on mainnet. If you don't already have it installed:
```bash
npm run dfx_install
```

Next you will want to start a replica, which is a local instance of the IC that you can deploy your canisters to:
```bash
npm run start
```

If you ever want to stop the replica:
```bash
npm run stop
```

Now you can deploy your canister locally:
```bash
npm install
npm run canister_deploy
```

## Alternatif Installation and Running Project
run dfx first:
```bash
dfx start --background --clean
```

create canister all inside project:
```bash
dfx canister create --all
```

build canister all inside project:
```bash
dfx build
```

install canister all inside project:
```bash
dfx canister install --all
```

deploy all project:
```bash
dfx deploy
```