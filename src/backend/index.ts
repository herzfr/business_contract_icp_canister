import { Canister, Opt, Result, StableBTreeMap, Vec, bool, ic, query, text, update } from 'azle';
import { v4 as uuidv4 } from "uuid";
import { contract, contractor, client, signature, signclientpayload, signcontractorpayload, createcontractpayload, getcontractpayload, StatusContract } from './interface'
import { IClient, IContract, IContractor, ISignature } from './payload';

type Contract = typeof contract.tsType;
type Contractor = typeof contractor.tsType;
type Client = typeof client.tsType;
type Signature = typeof signature.tsType;
type Status = typeof StatusContract.tsType;

let businessContract = StableBTreeMap<text, Contract>(2);

export default Canister({
    createContracts: update([createcontractpayload], Result(contract, text), (create_som) => {
        try {

            let newContractor: Contractor = IContractor
            let newClient: Client = IClient
            let newSignature: Signature = ISignature
            let newContract: Contract = IContract

            newContractor = {
                ...newContractor,
                legal_id: create_som.legal_id,
                company: create_som.company,
                name: create_som.name,
                city_stat_zipcode: create_som.city_stat_zipcode,
                phone: create_som.phone,
                email: create_som.email,
                website: create_som.website,
            }

            newContract = {
                ...newContract,
                contractor: newContractor,
                client: newClient,
                project_name: create_som.project_name,
                contract_value: create_som.contract_value,
                contractual_statement: create_som.contractual_statement,
                scope_contract: create_som.scope_contract,
                terms_of_Payment: create_som.terms_of_Payment,
                term_and_termination: create_som.term_and_termination,
                confidentiality: create_som.confidentiality,
                governing_law: create_som.governing_law,
                entire_agreement: create_som.entire_agreement,
                signature: newSignature
            }
            businessContract.insert(newContract.contract_id, newContract)
            return Result.Ok(newContract);
        } catch (err) {
            return Result.Err("Error While creating contract [" + err + "]");
        }
    }),

    getContract: query([getcontractpayload], Result(Opt(contract), text), (key) => {
        let ct = businessContract.get(key.contract_id)
        if ('None' in ct) return Result.Err('Contract is Empty')
        return Result.Ok(ct)
    }),

    getContracts: query([], Result(Vec(contract), text), () => {
        const contractList = businessContract.values();
        if (contractList.length === 0) {
            return Result.Err(`There's no one contract list`)
        }
        return Result.Ok(contractList)
    }),

    signClient: update([signclientpayload], Result(contract, text), (sign) => {
        try {
            const contract = businessContract.get(sign.contract_id);

            if ('None' in contract) { // Check contract exist
                return Result.Err("Contract not found.");
            }

            const ct = contract.Some;

            if (ct.signature.client_signed) { // check already signed
                return Result.Err("You have signed this contract!");
            }

            let newClient: Client = {
                counterparty_identity: sign.counterparty_identity,
                counterparty_name: sign.counterparty_name,
                city_stat_zipcode: sign.city_stat_zipcode,
                phone: sign.phone,
                email: sign.email,
                website: sign.website
            }

            let newSignature: Signature = {
                client_sign: sign.counterparty_name,
                client_signed: true,
                client_sign_date: ic.time(),
                contractor_sign: '',
                contractor_signed: false,
                contractor_sign_date: ic.time(),
            }

            ct.client = newClient
            ct.signature = newSignature

            businessContract.insert(sign.contract_id, ct);

            return Result.Ok(ct);
        } catch (err) {
            return Result.Err("Error While client signing contract [" + err + "]");
        }
    }),

    signContractor: update([signcontractorpayload], Result(contract, text), (sign) => {
        try {
            const contract = businessContract.get(sign.contract_id);
            if ('None' in contract) { // Check contract exist
                return Result.Err("Contract not found.");
            }

            const ct = contract.Some;

            if (!ct.signature.client_signed) { // check already signed
                return Result.Err("Your client hasn't yet signed the contract!");
            }

            let newSignature: Signature = {
                ...ct.signature,
                contractor_sign: ct.contractor.name,
                contractor_signed: true,
                contractor_sign_date: ic.time()
            }
            ct.signature = newSignature
            ct.status_contract = true

            businessContract.insert(sign.contract_id, ct);

            return Result.Ok(ct);
        } catch (err) {
            return Result.Err("Error While contractor signing contract [" + err + "]");
        }
    }),

    statusContract: query([getcontractpayload], Result(StatusContract, text), (key) => {
        let ct = businessContract.get(key.contract_id)
        if ('None' in ct) return Result.Err('Contract is Empty')

        const contract_get = ct.Some

        let statusContract: Status = {
            contract_id: key.contract_id,
            status: ''
        }

        if (!contract_get.signature.client_signed && !contract_get.signature.client_signed) {
            statusContract.status = `Waiting for the client's signature`
        } else if (!contract_get.signature.client_signed && contract_get.signature.client_signed) {
            statusContract.status = `The awaiting of approval from the contracting party`
        } else if (contract_get.signature.client_signed && contract_get.signature.client_signed) {
            statusContract.status = `The contract has been approved and the collaboration is currently underway`
        } else {
            statusContract.status = ``
        }
        return Result.Ok(statusContract)
    })
})
