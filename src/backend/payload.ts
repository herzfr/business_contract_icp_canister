import { ic } from "azle"

export const ICParty = {
    account_id: '',
    legal_name: '',
    address: '',
    identification_information: '',
    type_parties: { "INDIVIDUALS": "INDIVIDUALS" },
}

export const ICSignature = {
    party_id: '',
    sign_date: ic.time(),
    agree: false,
}

export const ICContract = {
    contract_id: '',
    principal: ic.caller(), // AS A PARTY WHO CREATE CONTRACT
    parties_involved: [], // as the involved party 
    client_wallet_id: '',
    effective_date: '',
    objective: '',
    scope_of_work: '',
    term_and_condition: '',
    payment_terms: '',
    term_and_termination: '',
    confidentialy: '',
    intellectual_property: '',
    dispute_resolution: '',
    governing_law: '',
    force_majeure: '',
    notice: '',
    amendments: '',
    signatures: [], // as the signing party
    status: { "ISSUED": "ISSUED" },
    contract_payment: BigInt(0)
}