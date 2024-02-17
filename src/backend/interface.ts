import { Opt, Principal, Record, bool, float64, nat64, text } from "azle";

export const contractor = Record({
    legal_id: text,
    company: text,
    name: text,
    city_stat_zipcode: text,
    phone: text,
    email: text,
    website: text,
});

export const client = Record({
    counterparty_identity: text,
    counterparty_name: text,
    city_stat_zipcode: text,
    phone: text,
    email: text,
    website: text,
});

export const signature = Record({
    contractor_sign: text,
    contractor_signed: bool,
    contractor_sign_date: nat64,
    client_sign: text,
    client_signed: bool,
    client_sign_date: nat64,
})

export const contract = Record({
    principal: Principal,
    createdAt: nat64,
    contract_id: text,
    project_name: text,
    contractor: contractor,
    client: client,
    contract_value: float64,
    contractual_statement: text,
    scope_contract: text,
    terms_of_Payment: text,
    term_and_termination: text,
    confidentiality: text,
    governing_law: text,
    entire_agreement: text,
    signature: signature,
    status_contract: bool,
})

export const createcontractpayload = Record({
    legal_id: text,
    company: text,
    name: text,
    city_stat_zipcode: text,
    phone: text,
    email: text,
    website: text,
    project_name: text,
    contract_value: float64,
    contractual_statement: text,
    scope_contract: text,
    terms_of_Payment: text,
    term_and_termination: text,
    confidentiality: text,
    governing_law: text,
    entire_agreement: text,
})

export const getcontractpayload = Record({
    contract_id: text
})

export const signcontractorpayload = Record({
    contract_id: text
})

export const signclientpayload = Record({
    contract_id: text,
    counterparty_identity: text,
    counterparty_name: text,
    city_stat_zipcode: text,
    phone: text,
    email: text,
    website: text,
})

export const StatusContract = Record({
    contract_id: text,
    status: text,
})