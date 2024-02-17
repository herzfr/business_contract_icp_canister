import { None, Opt, bool, ic, nat64 } from "azle"
import { v4 as uuidv4 } from "uuid";

export const IContractor = {
    legal_id: '',
    company: '',
    name: '',
    city_stat_zipcode: '',
    phone: '',
    email: '',
    website: '',
}

export const IClient = {
    counterparty_identity: '',
    counterparty_name: '',
    city_stat_zipcode: '',
    phone: '',
    email: '',
    website: ''
}

export const ISignature = {
    contractor_sign: '',
    contractor_signed: false,
    contractor_sign_date: ic.time(),
    client_sign: '',
    client_signed: false,
    client_sign_date: ic.time()
}


export const IContract = {
    principal: ic.caller(),
    createdAt: ic.time(),
    contract_id: uuidv4(),
    project_name: '',
    contractor: IContractor,
    client: IClient,
    contract_value: 0,
    contractual_statement: '',
    scope_contract: '',
    terms_of_Payment: '',
    term_and_termination: '',
    confidentiality: '',
    governing_law: '',
    entire_agreement: '',
    signature: ISignature,
    status_contract: false
}