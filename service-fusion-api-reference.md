# Service Fusion API Reference

> Auto-generated from the official RAML spec at docs.servicefusion.com
> Generated: 2026-04-10

- **Base URL**: `https://api.servicefusion.com/{version}`
- **Version**: v1
- **Media Type**: application/json
- **Protocol**: HTTPS

## Authentication

### oauth_2_0
This API supports OAuth 2.0 for authenticating all API requests.


**Query Parameters:**
- `access_token`: Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.


**Headers:**
- `Authorization`: Used to send a valid OAuth 2 access token. Do not use together with the `access_token` query parameter.


**Settings:**
- **accessTokenUri**: `https://api.servicefusion.com/oauth/access_token`
- **authorizationGrants**: `["authorization_code","client_credentials"]`

## Common Query Parameters (Traits)

### tra.formatable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Enum: json, xml |

### tra.me-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, first_name, last_name, email |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |

### tra.calendarTask-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, type, description, start_time, end_time, start_date, end_date, created_at, updated_at, is_public, is_completed, repeat_id, users_id, customers_id, jobs_id, estimates_id |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Enum: repeat |

### tra.calendarTask-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, type, description, start_time, end_time, start_date, end_date, created_at, updated_at, is_public, is_completed, repeat_id |

### tra.customer-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, customer_name, fully_qualified_name, account_number, account_balance, private_notes, public_notes, payment_terms, discount, discount_type, credit_rating, labor_charge_type, labor_charge_default_rate, qbo_sync_token, qbo_currency, qbo_id, qbd_id, created_at, updated_at, last_serviced_date, is_bill_for_drive_time, is_vip, is_taxable, parent_customer, referral_source, agent, assigned_contract, payment_type, tax_item_name, industry |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Enum: contacts, contacts.phones, contacts.emails, locations, custom_fields |

### tra.customer-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, customer_name, fully_qualified_name, account_number, private_notes, public_notes, payment_terms, discount, discount_type, credit_rating, labor_charge_type, labor_charge_default_rate, qbo_sync_token, qbo_currency, qbo_id, qbd_id, created_at, updated_at, last_serviced_date, is_bill_for_drive_time, is_vip, is_taxable, parent_customer, referral_source, agent, assigned_contract, payment_type, tax_item_name, industry |

### tra.customer-filtrable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `filters[name]` | string | No | - | Used to filter results by given name (partial match).  |
| `filters[contact_first_name]` | string | No | - | Used to filter results by given contact's first name (partial match).  |
| `filters[contact_last_name]` | string | No | - | Used to filter results by given contact's last name (partial match).  |
| `filters[address]` | string | No | - | Used to filter results by given address (partial match).  |
| `filters[city]` | string | No | - | Used to filter results by given city (full match).  |
| `filters[postal_code]` | integer | No | - | Used to filter results by given postal code (full match).  |
| `filters[phone]` | string | No | - | Used to filter results by given phone (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (full match).  |
| `filters[tags]` | string | No | - | Used to filter results by given tags (full match). Accepted value is comma-separated string.  |
| `filters[last_serviced_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of last serviced date (format: `Y-m-d`).  |
| `filters[last_serviced_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of last serviced date (format: `Y-m-d`).  |
| `filters[agreement_date_effective][lte]` | string | No | - | Used to filter results by given `less than or equal` of agreement date effective (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[agreement_date_effective][gte]` | string | No | - | Used to filter results by given `greater than or equal` of agreement date effective (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[agreement_date_expires][lte]` | string | No | - | Used to filter results by given `less than or equal` of agreement date expires (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[agreement_date_expires][gte]` | string | No | - | Used to filter results by given `greater than or equal` of agreement date expires (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |

### tra.job-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, number, check_number, priority, description, tech_notes, completion_notes, payment_status, taxes_fees_total, drive_labor_total, billable_expenses_total, total, payments_deposits_total, due_total, cost_total, duration, time_frame_promised_start, time_frame_promised_end, start_date, end_date, created_at, updated_at, closed_at, customer_id, customer_name, parent_customer, status, sub_status, contact_first_name, contact_last_name, street_1, street_2, city, state_prov, postal_code, location_name, is_gated, gate_instructions, category, source, payment_type, customer_payment_terms, project, phase, po_number, contract, note_to_customer, called_in_by, is_requires_follow_up |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Enum: agents, custom_fields, pictures, documents, equipment, equipment.custom_fields, techs_assigned, tasks, notes, products, services, other_charges, labor_charges, expenses, payments, invoices, signatures, printable_work_order, visits, visits.techs_assigned |

### tra.job-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, number, po_number, check_number, description, tech_notes, completion_notes, duration, time_frame_promised_start, time_frame_promised_end, start_date, end_date, created_at, updated_at, closed_at, customer_id, customer_name, status, sub_status, category, source, payment_type, customer_payment_terms, contract, called_in_by |

### tra.job-filtrable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `filters[status]` | string | No | - | Used to filter results by given statuses (full match). Accepted value is comma-separated string.  |
| `filters[number]` | string | No | - | Used to filter results by given number (partial match).  |
| `filters[po_number]` | string | No | - | Used to filter results by given po number (partial match).  |
| `filters[invoice_number]` | string | No | - | Used to filter results by given invoice number (partial match).  |
| `filters[customer_name]` | string | No | - | Used to filter results by given customer's name (partial match).  |
| `filters[parent_customer_name]` | string | No | - | Used to filter results by given parent customer's name (partial match).  |
| `filters[contact_first_name]` | string | No | - | Used to filter results by given contact's first name (partial match).  |
| `filters[contact_last_name]` | string | No | - | Used to filter results by given contact's last name (partial match).  |
| `filters[address]` | string | No | - | Used to filter results by given address (partial match).  |
| `filters[city]` | string | No | - | Used to filter results by given city (full match).  |
| `filters[zip_code]` | integer | No | - | Used to filter results by given zip code (full match).  |
| `filters[phone]` | string | No | - | Used to filter results by given phone (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (full match).  |
| `filters[category]` | string | No | - | Used to filter results by given categories (full match). Accepted value is comma-separated string.  |
| `filters[source]` | string | No | - | Used to filter results by given sources (full match). Accepted value is comma-separated string.  |
| `filters[start_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of start date (format: `Y-m-d`).  |
| `filters[start_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of start date (format: `Y-m-d`).  |
| `filters[end_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of end date (format: `Y-m-d`).  |
| `filters[end_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of end date (format: `Y-m-d`).  |
| `filters[updated_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of updated date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[updated_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of updated date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[closed_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of closed date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[closed_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of closed date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |

### tra.jobCategory-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, name |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |

### tra.jobCategory-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, name |

### tra.jobStatus-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, code, name, is_custom, category |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |

### tra.jobStatus-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, code, name, is_custom, category |

### tra.estimate-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, number, description, tech_notes, payment_status, taxes_fees_total, total, due_total, cost_total, duration, time_frame_promised_start, time_frame_promised_end, start_date, created_at, updated_at, customer_id, customer_name, parent_customer, status, sub_status, contact_first_name, contact_last_name, street_1, street_2, city, state_prov, postal_code, location_name, is_gated, gate_instructions, category, source, payment_type, customer_payment_terms, project, phase, po_number, contract, note_to_customer, opportunity_rating, opportunity_owner |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Enum: agents, custom_fields, pictures, documents, equipment, equipment.custom_fields, techs_assigned, tasks, notes, products, services, other_charges, payments, signatures, printable_work_order, tags |

### tra.estimate-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, number, po_number, description, tech_notes, duration, time_frame_promised_start, time_frame_promised_end, start_date, created_at, updated_at, customer_id, customer_name, status, sub_status, category, source, payment_type, customer_payment_terms, contract, opportunity_rating |

### tra.estimate-filtrable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `filters[status]` | string | No | - | Used to filter results by given statuses (full match). Accepted value is comma-separated string.  |
| `filters[number]` | string | No | - | Used to filter results by given number (partial match).  |
| `filters[po_number]` | string | No | - | Used to filter results by given po number (partial match).  |
| `filters[customer_name]` | string | No | - | Used to filter results by given customer's name (partial match).  |
| `filters[parent_customer_name]` | string | No | - | Used to filter results by given parent customer's name (partial match).  |
| `filters[contact_first_name]` | string | No | - | Used to filter results by given contact's first name (partial match).  |
| `filters[contact_last_name]` | string | No | - | Used to filter results by given contact's last name (partial match).  |
| `filters[address]` | string | No | - | Used to filter results by given address (partial match).  |
| `filters[city]` | string | No | - | Used to filter results by given city (full match).  |
| `filters[zip_code]` | integer | No | - | Used to filter results by given zip code (full match).  |
| `filters[phone]` | string | No | - | Used to filter results by given phone (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (full match).  |
| `filters[category]` | string | No | - | Used to filter results by given categories (full match). Accepted value is comma-separated string.  |
| `filters[source]` | string | No | - | Used to filter results by given sources (full match). Accepted value is comma-separated string.  |
| `filters[start_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of start date (format: `Y-m-d`).  |
| `filters[start_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of start date (format: `Y-m-d`).  |
| `filters[end_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of end date (format: `Y-m-d`).  |
| `filters[end_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of end date (format: `Y-m-d`).  |
| `filters[requested_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of requested date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[requested_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of requested date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |

### tra.invoice-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, number, currency, po_number, terms, customer_message, notes, pay_online_url, qbo_invoice_no, qbo_sync_token, qbo_synced_date, qbo_id, qbd_id, total, is_paid, date, mail_send_date, created_at, updated_at, customer, customer_contact, payment_terms, bill_to_customer_id, bill_to_customer_location_id, bill_to_customer_contact_id, bill_to_email_id, bill_to_phone_id |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |

### tra.invoice-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, number, currency, po_number, terms, customer_message, notes, qbo_invoice_no, qbo_sync_token, qbo_synced_date, qbo_id, qbd_id, total, is_paid, date, mail_send_date, created_at, updated_at, customer, customer_contact, payment_terms, bill_to_customer_id, bill_to_customer_location_id, bill_to_customer_contact_id, bill_to_email_id, bill_to_phone_id |

### tra.paymentType-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, code, short_name, type, is_custom |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |

### tra.paymentType-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, code, short_name, type, is_custom |

### tra.source-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, short_name, long_name |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |

### tra.source-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, short_name, long_name |

### tra.tech-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, first_name, last_name, nickname_on_workorder, nickname_on_dispatch, color_code, email, phone_1, phone_2, gender, department, title, bio, is_phone_1_mobile, is_phone_1_visible_to_client, is_phone_2_mobile, is_phone_2_visible_to_client, is_sales_rep, is_field_worker, created_at, updated_at |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |

### tra.tech-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, first_name, last_name, nickname_on_workorder, nickname_on_dispatch, color_code, email, phone_1, phone_2, gender, department, title, bio, is_phone_1_mobile, is_phone_1_visible_to_client, is_phone_2_mobile, is_phone_2_visible_to_client, is_sales_rep, is_field_worker, created_at, updated_at |

### tra.tech-filtrable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `filters[first_name]` | string | No | - | Used to filter results by given first name (partial match).  |
| `filters[last_name]` | string | No | - | Used to filter results by given last name (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (partial match).  |
| `filters[nickname_on_workorder]` | string | No | - | Used to filter results by given nickname on workorder (partial match).  |
| `filters[nickname_on_dispatch]` | string | No | - | Used to filter results by given nickname on dispatch (partial match).  |

### tra.equipment-fieldable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Enum: id, type, make, model, sku, serial_number, location, notes, extended_warranty_provider, is_extended_warranty, extended_warranty_date, warranty_date, install_date, created_at, updated_at, customer_id, customer, customer_location |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Enum: custom_fields |

### tra.equipment-sortable

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Enum: id, type, make, model, sku, serial_number, location, notes, extended_warranty_provider, is_extended_warranty, extended_warranty_date, warranty_date, install_date, created_at, updated_at, customer_id, customer, customer_location |

## Data Types

### OAuthToken

An authentication schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `access_token` | string | No | The access token string as issued by the authorization server.  |
| `token_type` | string | No | The type of token this is.  |
| `expires_in` | integer | No | The duration of time the access token is granted for.  |
| `refresh_token` | string | No | When an access token expires (exceeds the `expires_in` time), the `refresh_token` is used to obtain a new access token.  |

### OAuthTokenError

An authentication error's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `error` | string | No | The error title.  |
| `error_description` | string | No | The error description.  |

### typ.Error

An error's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### typ.400Error

Bad request client's error schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### typ.404Error

Not found client's error schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### typ.405Error

Method not allowed client's error schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### typ.415Error

Unsupported media type client's error schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### typ.422Error

Unprocessable entity client's error schema.


### typ.429Error

Too many requests client's error schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### typ.500Error

Internal server's error schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### typ.Agent

An agent's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The agent's identifier.  |
| `first_name` | string | No | The agent's first name.  |
| `last_name` | string | No | The agent's last name.  |

### typ.AgentBody

An agent's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | Used to send the agent's identifier that will be searched. If this field is set then the entry will be searched by it, otherwise the search will be performed by its full name.  |
| `first_name` | string | No | Used to send the agent's first name that will be searched. Required field for full name search.  |
| `last_name` | string | No | Used to send the agent's last name that will be searched. Required field for full name search.  |

### typ.AssignedTech

An assigned tech's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The assigned tech's identifier.  |
| `first_name` | string | No | The assigned tech's first name.  |
| `last_name` | string | No | The assigned tech's last name.  |

### typ.AssignedTechBody

An assigned tech's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | Used to send the assigned tech's identifier that will be searched. If this field is set then the entry will be searched by it, otherwise the search will be performed by its full name.  |
| `first_name` | string | No | Used to send the assigned tech's first name that will be searched. Required field for full name search.  |
| `last_name` | string | No | Used to send the assigned tech's last name that will be searched. Required field for full name search.  |

### typ.CalendarTask

A calendar task's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The calendar task's identifier.  |
| `type` | string | No | The calendar task's type.  |
| `description` | string | No | The calendar task's description.  |
| `start_time` | string | No | The calendar task's start time.  |
| `end_time` | string | No | The calendar task's end time.  |
| `start_date` | datetime | No | The calendar task's start date.  |
| `end_date` | datetime | No | The calendar task's end date.  |
| `created_at` | datetime | No | The calendar task's created date.  |
| `updated_at` | datetime | No | The calendar task's updated date.  |
| `is_public` | boolean | No | The calendar task's is public flag.  |
| `is_completed` | boolean | No | The calendar task's is completed flag.  |
| `repeat_id` | integer | No | The calendar task's repeat id.  |
| `users_id` | array | Yes | The calendar task's users list of identifiers.  |
| `customers_id` | array | Yes | The calendar task's customers list of identifiers.  |
| `jobs_id` | array | Yes | The calendar task's jobs list of identifiers.  |
| `estimates_id` | array | Yes | The calendar task's estimates list of identifiers.  |
| `repeat` | object | No | The calendar task's repeat.  |

### typ.CalendarTaskView

A calendar task's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The calendar task's identifier.  |
| `type` | string | No | The calendar task's type.  |
| `description` | string | No | The calendar task's description.  |
| `start_time` | string | No | The calendar task's start time.  |
| `end_time` | string | No | The calendar task's end time.  |
| `start_date` | datetime | No | The calendar task's start date.  |
| `end_date` | datetime | No | The calendar task's end date.  |
| `created_at` | datetime | No | The calendar task's created date.  |
| `updated_at` | datetime | No | The calendar task's updated date.  |
| `is_public` | boolean | No | The calendar task's is public flag.  |
| `is_completed` | boolean | No | The calendar task's is completed flag.  |
| `repeat_id` | integer | No | The calendar task's repeat id.  |
| `users_id` | array | Yes | The calendar task's users list of identifiers.  |
| `customers_id` | array | Yes | The calendar task's customers list of identifiers.  |
| `jobs_id` | array | Yes | The calendar task's jobs list of identifiers.  |
| `estimates_id` | array | Yes | The calendar task's estimates list of identifiers.  |
| `repeat` | object | No | The calendar task's repeat.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.CalendarTaskRepeat

A calendar task repeat's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The repeat's identifier.  |
| `repeat_type` | string | No | The repeat's type.  |
| `repeat_frequency` | integer | No | The repeat's frequency.  |
| `repeat_weekly_days` | array | Yes | The repeat's weekly days list.  |
| `repeat_monthly_type` | string | No | The repeat's monthly type.  |
| `stop_repeat_type` | string | No | The repeat's stop type.  |
| `stop_repeat_on_occurrence` | integer | No | The repeat's stop on occurrence.  |
| `stop_repeat_on_date` | datetime | No | The repeat's stop on date.  |
| `start_date` | datetime | No | The repeat's start date.  |
| `end_date` | datetime | No | The repeat's end date.  |

### typ.CustomField

A custom field's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The custom field's name.  |
| `value` | any | No | The custom field's value.  |
| `type` | string | No | The custom field's type.  |
| `group` | string | No | The custom field's group.  |
| `created_at` | datetime | No | The custom field's created date.  |
| `updated_at` | datetime | No | The custom field's updated date.  |
| `is_required` | boolean | No | The custom field's is required flag.  |

### typ.CustomFieldBody

A custom field's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Used to send the custom field's name that will be set.  |
| `value` | any | Yes | Used to send the custom field's value that will be set.  |

### typ.Customer

A customer's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The customer's identifier.  |
| `customer_name` | string | No | The customer's name.  |
| `fully_qualified_name` | string | No | The customer's fully qualified name.  |
| `parent_customer` | string | No | The `header` of attached parent customer to the customer (Note: `header` - [string] the parent customer's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `account_number` | string | No | The customer's account number.  |
| `account_balance` | number | No | The customer's account balance.  |
| `private_notes` | string | No | The customer's private notes.  |
| `public_notes` | string | No | The customer's public notes.  |
| `credit_rating` | string | No | The customer's credit rating.  |
| `labor_charge_type` | string | No | The customer's labor charge type.  |
| `labor_charge_default_rate` | number | No | The customer's labor charge default rate.  |
| `last_serviced_date` | datetime | No | The customer's last serviced date.  |
| `is_bill_for_drive_time` | boolean | No | The customer's is bill for drive time flag.  |
| `is_vip` | boolean | No | The customer's is vip flag.  |
| `referral_source` | string | No | The `header` of attached referral source to the customer (Note: `header` - [string] the referral source's fields concatenated by pattern `{short_name}`).  |
| `agent` | string | No | The `header` of attached agent to the customer (Note: `header` - [string] the agent's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `discount` | number | No | The customer's discount.  |
| `discount_type` | string | No | The customer's discount type.  |
| `payment_type` | string | No | The `header` of attached payment type to the customer (Note: `header` - [string] the payment type's fields concatenated by pattern `{name}`).  |
| `payment_terms` | string | No | The customer's payment terms.  |
| `assigned_contract` | string | No | The `header` of attached contract to the customer (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `industry` | string | No | The `header` of attached industry to the customer (Note: `header` - [string] the industry's fields concatenated by pattern `{industry}`).  |
| `is_taxable` | boolean | No | The customer's is taxable flag.  |
| `tax_item_name` | string | No | The `header` of attached tax item to the customer (Note: `header` - [string] the tax item's fields concatenated by pattern `{short_name}` with space as separator).  |
| `qbo_sync_token` | integer | No | The customer's qbo sync token.  |
| `qbo_currency` | string | No | The customer's qbo currency.  |
| `qbo_id` | integer | No | The customer's qbo id.  |
| `qbd_id` | string | No | The customer's qbd id.  |
| `created_at` | datetime | No | The customer's created date.  |
| `updated_at` | datetime | No | The customer's updated date.  |
| `contacts` | array | No | The customer's contacts list.  |
| `locations` | array | No | The customer's locations list.  |
| `custom_fields` | array | No | The customer's custom fields list.  |

### typ.CustomerBody

A customer's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customer_name` | string | Yes | Used to send the customer's name that will be set.  |
| `parent_customer` | string | No | Used to send a parent customer's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the parent customer's identifier, `header` - [string] the parent customer's fields conca |
| `account_number` | string | No | Used to send the customer's account number that will be set.  |
| `private_notes` | string | No | Used to send the customer's private notes that will be set.  |
| `public_notes` | string | No | Used to send the customer's public notes that will be set.  |
| `credit_rating` | string | No | Used to send the customer's credit rating that will be set.  |
| `labor_charge_type` | string | No | Used to send the customer's labor charge type that will be set.  |
| `labor_charge_default_rate` | number | No | Used to send the customer's labor charge default rate that will be set.  |
| `last_serviced_date` | datetime | No | Used to send the customer's last serviced date that will be set.  |
| `is_bill_for_drive_time` | boolean | No | Used to send the customer's is bill for drive time flag that will be set.  |
| `is_vip` | boolean | No | Used to send the customer's is vip flag that will be set.  |
| `referral_source` | string | No | Used to send a referral source's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the referral source's identifier, `header` - [string] the referral source's fields conca |
| `agent` | string | No | Used to send an agent's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the agent's identifier, `header` - [string] the agent's fields concatenated by pattern `{first_na |
| `discount` | number | No | Used to send the customer's discount that will be set.  |
| `discount_type` | string | No | Used to send the customer's discount type that will be set.  |
| `payment_type` | string | No | Used to send a payment type's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the payment type's identifier, `header` - [string] the payment type's fields concatenated b |
| `payment_terms` | string | No | Used to send the customer's payment terms that will be set.  |
| `assigned_contract` | string | No | Used to send an assigned contract's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the assigned contract's identifier, `header` - [string] the assigned contract's field |
| `industry` | string | No | Used to send an industry's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the industry's identifier, `header` - [string] the industry's fields concatenated by pattern ` |
| `is_taxable` | boolean | No | Used to send the customer's is taxable flag that will be set.  |
| `tax_item_name` | string | No | Used to send a tax item's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the tax item's identifier, `header` - [string] the tax item's fields concatenated by pattern `{ |
| `qbo_sync_token` | integer | No | Used to send the customer's qbo sync token that will be set.  |
| `qbo_currency` | string | No | Used to send the customer's qbo currency that will be set.  |
| `contacts` | array | No | Used to send the customer's contacts list that will be set.  |
| `locations` | array | No | Used to send the customer's locations list that will be set.  |
| `custom_fields` | array | No | Used to send the customer's custom fields list that will be set.  |

### typ.CustomerView

A customer's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The customer's identifier.  |
| `customer_name` | string | No | The customer's name.  |
| `fully_qualified_name` | string | No | The customer's fully qualified name.  |
| `parent_customer` | string | No | The `header` of attached parent customer to the customer (Note: `header` - [string] the parent customer's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `account_number` | string | No | The customer's account number.  |
| `account_balance` | number | No | The customer's account balance.  |
| `private_notes` | string | No | The customer's private notes.  |
| `public_notes` | string | No | The customer's public notes.  |
| `credit_rating` | string | No | The customer's credit rating.  |
| `labor_charge_type` | string | No | The customer's labor charge type.  |
| `labor_charge_default_rate` | number | No | The customer's labor charge default rate.  |
| `last_serviced_date` | datetime | No | The customer's last serviced date.  |
| `is_bill_for_drive_time` | boolean | No | The customer's is bill for drive time flag.  |
| `is_vip` | boolean | No | The customer's is vip flag.  |
| `referral_source` | string | No | The `header` of attached referral source to the customer (Note: `header` - [string] the referral source's fields concatenated by pattern `{short_name}`).  |
| `agent` | string | No | The `header` of attached agent to the customer (Note: `header` - [string] the agent's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `discount` | number | No | The customer's discount.  |
| `discount_type` | string | No | The customer's discount type.  |
| `payment_type` | string | No | The `header` of attached payment type to the customer (Note: `header` - [string] the payment type's fields concatenated by pattern `{name}`).  |
| `payment_terms` | string | No | The customer's payment terms.  |
| `assigned_contract` | string | No | The `header` of attached contract to the customer (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `industry` | string | No | The `header` of attached industry to the customer (Note: `header` - [string] the industry's fields concatenated by pattern `{industry}`).  |
| `is_taxable` | boolean | No | The customer's is taxable flag.  |
| `tax_item_name` | string | No | The `header` of attached tax item to the customer (Note: `header` - [string] the tax item's fields concatenated by pattern `{short_name}` with space as separator).  |
| `qbo_sync_token` | integer | No | The customer's qbo sync token.  |
| `qbo_currency` | string | No | The customer's qbo currency.  |
| `qbo_id` | integer | No | The customer's qbo id.  |
| `qbd_id` | string | No | The customer's qbd id.  |
| `created_at` | datetime | No | The customer's created date.  |
| `updated_at` | datetime | No | The customer's updated date.  |
| `contacts` | array | No | The customer's contacts list.  |
| `locations` | array | No | The customer's locations list.  |
| `custom_fields` | array | No | The customer's custom fields list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.CustomerContact

A customer contact's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prefix` | string | No | The contact's prefix.  |
| `fname` | string | No | The contact's first name.  |
| `lname` | string | No | The contact's last name.  |
| `suffix` | string | No | The contact's suffix.  |
| `contact_type` | string | No | The contact's type.  |
| `dob` | string | No | The contact's dob.  |
| `anniversary` | string | No | The contact's anniversary.  |
| `job_title` | string | No | The contact's job title.  |
| `department` | string | No | The contact's department.  |
| `created_at` | datetime | No | The contact's created date.  |
| `updated_at` | datetime | No | The contact's updated date.  |
| `is_primary` | boolean | No | The contact's is primary flag.  |
| `phones` | array | No | The contact's phones list.  |
| `emails` | array | No | The contact's emails list.  |

### typ.CustomerContactBody

A customer contact's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prefix` | string | No | Used to send the contact's prefix that will be set.  |
| `fname` | string | Yes | Used to send the contact's first name that will be set.  |
| `lname` | string | Yes | Used to send the contact's last name that will be set.  |
| `suffix` | string | No | Used to send the contact's suffix that will be set.  |
| `contact_type` | string | No | Used to send the contact's type that will be set.  |
| `dob` | string | No | Used to send the contact's dob that will be set.  |
| `anniversary` | string | No | Used to send the contact's anniversary that will be set.  |
| `job_title` | string | No | Used to send the contact's job title that will be set.  |
| `department` | string | No | Used to send the contact's department that will be set.  |
| `is_primary` | boolean | No | Used to send the contact's is primary flag that will be set. When it is passed as `true`, then the customer's existing primary contact (if any) will become secondary, and this one will become the prim |
| `phones` | array | No | Used to send the contact's phones list that will be set.  |
| `emails` | array | No | Used to send the contact's emails list that will be set.  |

### typ.CustomerEmail

A customer email's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | No | The email's address.  |
| `class` | string | No | The email's class.  |
| `types_accepted` | string | No | The email's types accepted.  |
| `created_at` | datetime | No | The email's created date.  |
| `updated_at` | datetime | No | The email's updated date.  |

### typ.CustomerEmailBody

A customer email's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Used to send the email's address that will be set.  |
| `class` | string | No | Used to send the email's class that will be set.  |
| `types_accepted` | string | No | Used to send the email's types accepted that will be set. Accepted value is comma-separated string.  |

### typ.CustomerLocation

A customer location's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `street_1` | string | No | The location's street 1.  |
| `street_2` | string | No | The location's street 2.  |
| `city` | string | No | The location's city.  |
| `state_prov` | string | No | The location's state.  |
| `postal_code` | string | No | The location's postal code.  |
| `country` | string | No | The location's country.  |
| `nickname` | string | No | The location's nickname.  |
| `gate_instructions` | string | No | The location's gate instructions.  |
| `latitude` | number | No | The location's latitude.  |
| `longitude` | number | No | The location's longitude.  |
| `location_type` | string | No | The location's type.  |
| `created_at` | datetime | No | The location's created date.  |
| `updated_at` | datetime | No | The location's updated date.  |
| `is_primary` | boolean | No | The location's is primary flag.  |
| `is_gated` | boolean | No | The location's is gated flag.  |
| `is_bill_to` | boolean | No | The location's is bill to flag.  |
| `customer_contact` | string | No | The `header` of attached customer contact to the location (Note: `header` - [string] the customer contact's fields concatenated by pattern `{fname} {lname}` with space as separator).  |

### typ.CustomerLocationBody

A customer location's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `street_1` | string | Yes | Used to send the location's street 1 that will be set.  |
| `street_2` | string | No | Used to send the location's street 2 that will be set.  |
| `city` | string | No | Used to send the location's city that will be set.  |
| `state_prov` | string | No | Used to send the location's state that will be set.  |
| `postal_code` | string | No | Used to send the location's postal code that will be set.  |
| `country` | string | No | Used to send the location's country that will be set.  |
| `nickname` | string | No | Used to send the location's nickname that will be set.  |
| `gate_instructions` | string | No | Used to send the location's gate instructions that will be set.  |
| `latitude` | number | No | Used to send the location's latitude that will be set.  |
| `longitude` | number | No | Used to send the location's longitude that will be set.  |
| `location_type` | string | No | Used to send the location's type that will be set.  |
| `is_primary` | boolean | No | Used to send the location's is primary flag that will be set. When it is passed as `true`, then the customer's existing primary location (if any) will become secondary, and this one will become the pr |
| `is_gated` | boolean | No | Used to send the location's `is gated` flag that will be set.  |
| `is_bill_to` | boolean | No | Used to send the location's is bill to flag that will be set.  |
| `customer_contact` | string | No | Used to send a customer contact's `id` or `header` that will be attached to the location (Note: `id` - [integer] the customer contact's identifier, `header` - [string] the customer contact's fields co |

### typ.CustomerPhone

A customer phone's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `phone` | string | No | The phone's number.  |
| `ext` | integer | No | The phone's extension.  |
| `type` | string | No | The phone's type.  |
| `created_at` | datetime | No | The phone's created date.  |
| `updated_at` | datetime | No | The phone's updated date.  |
| `is_mobile` | boolean | No | The phone's is mobile flag.  |

### typ.CustomerPhoneBody

A customer phone's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `phone` | string | Yes | Used to send the phone's number that will be set.  |
| `ext` | integer | No | Used to send the phone's extension that will be set.  |
| `type` | string | No | Used to send the phone's type that will be set.  |

### typ.Equipment

An equipment's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The equipment's identifier.  |
| `type` | string | No | The equipment's type.  |
| `make` | string | No | The equipment's make.  |
| `model` | string | No | The equipment's model.  |
| `sku` | string | No | The equipment's sku.  |
| `serial_number` | string | No | The equipment's serial number.  |
| `location` | string | No | The equipment's location.  |
| `notes` | string | No | The equipment's notes.  |
| `extended_warranty_provider` | string | No | The equipment's extended warranty provider.  |
| `is_extended_warranty` | boolean | No | The equipment's is extended warranty flag.  |
| `extended_warranty_date` | datetime | No | The equipment's extended warranty date.  |
| `warranty_date` | datetime | No | The equipment's warranty date.  |
| `install_date` | datetime | No | The equipment's install date.  |
| `created_at` | datetime | No | The equipment's created date.  |
| `updated_at` | datetime | No | The equipment's updated date.  |
| `customer_id` | integer | No | The `id` of attached customer to the equipment (Note: `id` - [integer] the customer's identifier).  |
| `customer` | string | No | The `header` of attached customer to the equipment (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `customer_location` | string | No | The `header` of attached customer location to the equipment (Note: `header` - [string] the customer location's fields concatenated by pattern `{nickname} {street_1} {city}` with space as separator).  |
| `custom_fields` | array | No | The equipment's custom fields list.  |

### typ.EquipmentBody

An equipment's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | No | Used to send the equipment's identifier that will be searched. You may pass this parameter if you do not want to create new entry but assign existing one. You may assign by `identifier` or `header` (N |
| `type` | string | No | Used to send the equipment's type that will be set.  |
| `make` | string | No | Used to send the equipment's make that will be set.  |
| `model` | string | No | Used to send the equipment's model that will be set.  |
| `sku` | string | No | Used to send the equipment's sku that will be set.  |
| `serial_number` | string | No | Used to send the equipment's serial number that will be set.  |
| `location` | string | No | Used to send the equipment's location that will be set.  |
| `notes` | string | No | Used to send the equipment's notes that will be set.  |
| `extended_warranty_provider` | string | No | Used to send the equipment's extended warranty provider that will be set.  |
| `is_extended_warranty` | boolean | No | Used to send the equipment's is extended warranty flag that will be set.  |
| `extended_warranty_date` | datetime | No | Used to send the equipment's extended warranty date that will be set.  |
| `warranty_date` | datetime | No | Used to send the equipment's warranty date that will be set.  |
| `install_date` | datetime | No | Used to send the equipment's install date that will be set.  |
| `customer_location` | string | No | Used to send a customer location's `id` or `header` that will be attached to the equipment (Note: `id` - [integer] the customer location's identifier, `header` - [string] the customer location's field |
| `custom_fields` | array | No | Used to send the equipment's custom fields list that will be set.  |

### typ.EquipmentView

An equipment's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The equipment's identifier.  |
| `type` | string | No | The equipment's type.  |
| `make` | string | No | The equipment's make.  |
| `model` | string | No | The equipment's model.  |
| `sku` | string | No | The equipment's sku.  |
| `serial_number` | string | No | The equipment's serial number.  |
| `location` | string | No | The equipment's location.  |
| `notes` | string | No | The equipment's notes.  |
| `extended_warranty_provider` | string | No | The equipment's extended warranty provider.  |
| `is_extended_warranty` | boolean | No | The equipment's is extended warranty flag.  |
| `extended_warranty_date` | datetime | No | The equipment's extended warranty date.  |
| `warranty_date` | datetime | No | The equipment's warranty date.  |
| `install_date` | datetime | No | The equipment's install date.  |
| `created_at` | datetime | No | The equipment's created date.  |
| `updated_at` | datetime | No | The equipment's updated date.  |
| `customer_id` | integer | No | The `id` of attached customer to the equipment (Note: `id` - [integer] the customer's identifier).  |
| `customer` | string | No | The `header` of attached customer to the equipment (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `customer_location` | string | No | The `header` of attached customer location to the equipment (Note: `header` - [string] the customer location's fields concatenated by pattern `{nickname} {street_1} {city}` with space as separator).  |
| `custom_fields` | array | No | The equipment's custom fields list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.Estimate

An estimate's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The estimate's identifier.  |
| `number` | string | No | The estimate's number.  |
| `description` | string | No | The estimate's description.  |
| `tech_notes` | string | No | The estimate's tech notes.  |
| `customer_payment_terms` | string | No | The estimate's customer payment terms.  |
| `payment_status` | string | No | The estimate's payment status.  |
| `taxes_fees_total` | number | No | The estimate's taxes and fees total.  |
| `total` | number | No | The estimate's total.  |
| `due_total` | number | No | The estimate's due total.  |
| `cost_total` | number | No | The estimate's cost total.  |
| `duration` | integer | No | The estimate's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The estimate's time frame promised start.  |
| `time_frame_promised_end` | string | No | The estimate's time frame promised end.  |
| `start_date` | datetime | No | The estimate's start date.  |
| `created_at` | datetime | No | The estimate's created date.  |
| `updated_at` | datetime | No | The estimate's updated date.  |
| `customer_id` | integer | No | The `id` of attached customer to the estimate (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the estimate (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the estimate (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the estimate (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the estimate (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The estimate's contact first name.  |
| `contact_last_name` | string | No | The estimate's contact last name.  |
| `street_1` | string | No | The estimate's location street 1.  |
| `street_2` | string | No | The estimate's location street 2.  |
| `city` | string | No | The estimate's location city.  |
| `state_prov` | string | No | The estimate's location state prov.  |
| `postal_code` | string | No | The estimate's location postal code.  |
| `location_name` | string | No | The estimate's location name.  |
| `is_gated` | boolean | No | The estimate's location is gated flag.  |
| `gate_instructions` | string | No | The estimate's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the estimate (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the estimate (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the estimate (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `project` | string | No | The `header` of attached project to the estimate (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the estimate (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The estimate's po number.  |
| `contract` | string | No | The `header` of attached contract to the estimate (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The estimate's note to customer.  |
| `opportunity_rating` | integer | No | The estimate's opportunity rating.  |
| `opportunity_owner` | string | No | The `header` of attached opportunity owner to the estimate (Note: `header` - [string] the opportunity owner's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `agents` | array | No | The estimate's agents list.  |
| `custom_fields` | array | No | The estimate's custom fields list.  |
| `pictures` | array | No | The estimate's pictures list.  |
| `documents` | array | No | The estimate's documents list.  |
| `equipment` | array | No | The estimate's equipments list.  |
| `techs_assigned` | array | No | The estimate's techs assigned list.  |
| `tasks` | array | No | The estimate's tasks list.  |
| `notes` | array | No | The estimate's notes list.  |
| `products` | array | No | The estimate's products list.  |
| `services` | array | No | The estimate's services list.  |
| `other_charges` | array | No | The estimate's other charges list.  |
| `payments` | array | No | The estimate's payments list.  |
| `signatures` | array | No | The estimate's signatures list.  |
| `printable_work_order` | array | No | The estimate's printable work order list.  |
| `tags` | array | No | The estimate's tags list.  |

### typ.EstimateBody

An estimate's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | No | Used to send the estimate's description that will be set.  |
| `tech_notes` | string | No | Used to send the estimate's tech notes that will be set.  |
| `duration` | integer | No | Used to send the estimate's duration (in seconds) that will be set.  |
| `time_frame_promised_start` | string | No | Used to send the estimate's time frame promised start that will be set.  |
| `time_frame_promised_end` | string | No | Used to send the estimate's time frame promised end that will be set.  |
| `start_date` | datetime | No | Used to send the estimate's start date that will be set.  |
| `created_at` | datetime | No | Used to send the estimate's created date that will be set.  |
| `customer_name` | string | Yes | Used to send a customer's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the customer's identifier, `header` - [string] the customer's fields concatenated by pattern `{ |
| `status` | string | No | Used to send a status'es `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the status'es identifier, `header` - [string] the status'es fields concatenated by pattern `{nam |
| `contact_first_name` | string | No | Used to send the estimate's contact first name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be atta |
| `contact_last_name` | string | No | Used to send the estimate's contact last name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be attac |
| `street_1` | string | No | Used to send the estimate's location street 1 that will be set.  |
| `street_2` | string | No | Used to send the estimate's location street 2 that will be set.  |
| `city` | string | No | Used to send the estimate's location city that will be set.  |
| `state_prov` | string | No | Used to send the estimate's location state prov that will be set.  |
| `postal_code` | string | No | Used to send the estimate's location postal code that will be set.  |
| `location_name` | string | No | Used to send the estimate's location name that will be set.  |
| `is_gated` | boolean | No | Used to send the estimate's location is gated flag that will be set.  |
| `gate_instructions` | string | No | Used to send the estimate's location gate instructions that will be set.  |
| `category` | string | No | Used to send a category's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the category's identifier, `header` - [string] the category's fields concatenated by pattern `{ |
| `source` | string | No | Used to send a source's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the source's identifier, `header` - [string] the source's fields concatenated by pattern `{short_ |
| `project` | string | No | Used to send a project's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the project's identifier, `header` - [string] the project's fields concatenated by pattern `{nam |
| `phase` | string | No | Used to send a phase's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the phase's identifier, `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | Used to send the estimate's po number that will be set.  |
| `contract` | string | No | Used to send a contract's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the contract's identifier, `header` - [string] the contract's fields concatenated by pattern `{ |
| `note_to_customer` | string | No | Used to send the estimate's note to customer that will be set.  |
| `opportunity_rating` | integer | No | Used to send the estimate's opportunity rating that will be set.  |
| `opportunity_owner` | string | No | Used to send an opportunity owner's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the opportunity owner's identifier, `header` - [string] the opportunity owner's field |
| `custom_fields` | array | No | Used to send the estimate's custom fields list that will be set.  |
| `equipment` | array | No | Used to send the estimate's equipments list that will be set.  |
| `techs_assigned` | array | No | Used to send the estimate's techs assigned list that will be set.  |
| `tasks` | array | No | Used to send the estimate's tasks list that will be set.  |
| `notes` | array | No | Used to send the estimate's notes list that will be set.  |
| `products` | array | No | Used to send the estimate's products list that will be set.  |
| `services` | array | No | Used to send the estimate's services list that will be set.  |
| `other_charges` | array | No | Used to send the estimate's other charges list that will be set.  |
| `tags` | array | No | Used to send the estimate's tags list that will be set.  |

### typ.EstimateView

An estimate's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The estimate's identifier.  |
| `number` | string | No | The estimate's number.  |
| `description` | string | No | The estimate's description.  |
| `tech_notes` | string | No | The estimate's tech notes.  |
| `customer_payment_terms` | string | No | The estimate's customer payment terms.  |
| `payment_status` | string | No | The estimate's payment status.  |
| `taxes_fees_total` | number | No | The estimate's taxes and fees total.  |
| `total` | number | No | The estimate's total.  |
| `due_total` | number | No | The estimate's due total.  |
| `cost_total` | number | No | The estimate's cost total.  |
| `duration` | integer | No | The estimate's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The estimate's time frame promised start.  |
| `time_frame_promised_end` | string | No | The estimate's time frame promised end.  |
| `start_date` | datetime | No | The estimate's start date.  |
| `created_at` | datetime | No | The estimate's created date.  |
| `updated_at` | datetime | No | The estimate's updated date.  |
| `customer_id` | integer | No | The `id` of attached customer to the estimate (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the estimate (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the estimate (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the estimate (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the estimate (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The estimate's contact first name.  |
| `contact_last_name` | string | No | The estimate's contact last name.  |
| `street_1` | string | No | The estimate's location street 1.  |
| `street_2` | string | No | The estimate's location street 2.  |
| `city` | string | No | The estimate's location city.  |
| `state_prov` | string | No | The estimate's location state prov.  |
| `postal_code` | string | No | The estimate's location postal code.  |
| `location_name` | string | No | The estimate's location name.  |
| `is_gated` | boolean | No | The estimate's location is gated flag.  |
| `gate_instructions` | string | No | The estimate's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the estimate (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the estimate (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the estimate (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `project` | string | No | The `header` of attached project to the estimate (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the estimate (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The estimate's po number.  |
| `contract` | string | No | The `header` of attached contract to the estimate (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The estimate's note to customer.  |
| `opportunity_rating` | integer | No | The estimate's opportunity rating.  |
| `opportunity_owner` | string | No | The `header` of attached opportunity owner to the estimate (Note: `header` - [string] the opportunity owner's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `agents` | array | No | The estimate's agents list.  |
| `custom_fields` | array | No | The estimate's custom fields list.  |
| `pictures` | array | No | The estimate's pictures list.  |
| `documents` | array | No | The estimate's documents list.  |
| `equipment` | array | No | The estimate's equipments list.  |
| `techs_assigned` | array | No | The estimate's techs assigned list.  |
| `tasks` | array | No | The estimate's tasks list.  |
| `notes` | array | No | The estimate's notes list.  |
| `products` | array | No | The estimate's products list.  |
| `services` | array | No | The estimate's services list.  |
| `other_charges` | array | No | The estimate's other charges list.  |
| `payments` | array | No | The estimate's payments list.  |
| `signatures` | array | No | The estimate's signatures list.  |
| `printable_work_order` | array | No | The estimate's printable work order list.  |
| `tags` | array | No | The estimate's tags list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.Invoice

An invoice's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The invoice's identifier.  |
| `number` | integer | No | The invoice's number.  |
| `currency` | string | No | The invoice's currency.  |
| `po_number` | string | No | The invoice's po number.  |
| `terms` | string | No | The invoice's terms.  |
| `customer_message` | string | No | The invoice's customer message.  |
| `notes` | string | No | The invoice's notes.  |
| `pay_online_url` | string | No | The invoice's pay online url.  |
| `qbo_invoice_no` | integer | No | The invoice's qbo invoice no.  |
| `qbo_sync_token` | integer | No | The invoice's qbo sync token.  |
| `qbo_synced_date` | datetime | No | The invoice's qbo synced date.  |
| `qbo_id` | integer | No | The invoice's qbo class id.  |
| `qbd_id` | string | No | The invoice's qbd class id.  |
| `total` | number | No | The invoice's total.  |
| `is_paid` | boolean | No | The invoice's is paid flag.  |
| `date` | datetime | No | The invoice's date.  |
| `mail_send_date` | datetime | No | The invoice's mail send date.  |
| `created_at` | datetime | No | The invoice's created date.  |
| `updated_at` | datetime | No | The invoice's updated date.  |
| `customer` | string | No | The `header` of attached customer to the invoice (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `customer_contact` | string | No | The `header` of attached customer contact to the invoice (Note: `header` - [string] the customer contact's fields concatenated by pattern `{fname} {lname}` with space as separator).  |
| `payment_terms` | string | No | The `header` of attached payment term to the invoice (Note: `header` - [string] the payment term's fields concatenated by pattern `{name}`).  |
| `bill_to_customer_id` | integer | No | The `id` of attached bill to customer to the invoice (Note: `id` - [integer] the bill to customer's identifier).  |
| `bill_to_customer_location_id` | integer | No | The `id` of attached bill to customer location to the invoice (Note: `id` - [integer] the bill to customer location's identifier).  |
| `bill_to_customer_contact_id` | integer | No | The `id` of attached bill to customer contact to the invoice (Note: `id` - [integer] the bill to customer contact's identifier).  |
| `bill_to_email_id` | integer | No | The `id` of attached bill to email to the invoice (Note: `id` - [integer] the bill to email's identifier).  |
| `bill_to_phone_id` | integer | No | The `id` of attached bill to phone to the invoice (Note: `id` - [integer] the bill to phone's identifier).  |

### typ.InvoiceView

An invoice's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The invoice's identifier.  |
| `number` | integer | No | The invoice's number.  |
| `currency` | string | No | The invoice's currency.  |
| `po_number` | string | No | The invoice's po number.  |
| `terms` | string | No | The invoice's terms.  |
| `customer_message` | string | No | The invoice's customer message.  |
| `notes` | string | No | The invoice's notes.  |
| `pay_online_url` | string | No | The invoice's pay online url.  |
| `qbo_invoice_no` | integer | No | The invoice's qbo invoice no.  |
| `qbo_sync_token` | integer | No | The invoice's qbo sync token.  |
| `qbo_synced_date` | datetime | No | The invoice's qbo synced date.  |
| `qbo_id` | integer | No | The invoice's qbo class id.  |
| `qbd_id` | string | No | The invoice's qbd class id.  |
| `total` | number | No | The invoice's total.  |
| `is_paid` | boolean | No | The invoice's is paid flag.  |
| `date` | datetime | No | The invoice's date.  |
| `mail_send_date` | datetime | No | The invoice's mail send date.  |
| `created_at` | datetime | No | The invoice's created date.  |
| `updated_at` | datetime | No | The invoice's updated date.  |
| `customer` | string | No | The `header` of attached customer to the invoice (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `customer_contact` | string | No | The `header` of attached customer contact to the invoice (Note: `header` - [string] the customer contact's fields concatenated by pattern `{fname} {lname}` with space as separator).  |
| `payment_terms` | string | No | The `header` of attached payment term to the invoice (Note: `header` - [string] the payment term's fields concatenated by pattern `{name}`).  |
| `bill_to_customer_id` | integer | No | The `id` of attached bill to customer to the invoice (Note: `id` - [integer] the bill to customer's identifier).  |
| `bill_to_customer_location_id` | integer | No | The `id` of attached bill to customer location to the invoice (Note: `id` - [integer] the bill to customer location's identifier).  |
| `bill_to_customer_contact_id` | integer | No | The `id` of attached bill to customer contact to the invoice (Note: `id` - [integer] the bill to customer contact's identifier).  |
| `bill_to_email_id` | integer | No | The `id` of attached bill to email to the invoice (Note: `id` - [integer] the bill to email's identifier).  |
| `bill_to_phone_id` | integer | No | The `id` of attached bill to phone to the invoice (Note: `id` - [integer] the bill to phone's identifier).  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.Job

A job's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job's identifier.  |
| `number` | string | No | The job's number.  |
| `check_number` | string | No | The job's check number.  |
| `priority` | string | No | The job's priority.  |
| `description` | string | No | The job's description.  |
| `tech_notes` | string | No | The job's tech notes.  |
| `completion_notes` | string | No | The job's completion notes.  |
| `payment_status` | string | No | The job's payment status.  |
| `taxes_fees_total` | number | No | The job's taxes and fees total.  |
| `drive_labor_total` | number | No | The job's drive and labor total.  |
| `billable_expenses_total` | number | No | The job's billable expenses total.  |
| `total` | number | No | The job's total.  |
| `payments_deposits_total` | number | No | The job's payments and deposits total.  |
| `due_total` | number | No | The job's due total.  |
| `cost_total` | number | No | The job's cost total.  |
| `duration` | integer | No | The job's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The job's time frame promised start.  |
| `time_frame_promised_end` | string | No | The job's time frame promised end.  |
| `start_date` | datetime | No | The job's start date.  |
| `end_date` | datetime | No | The job's end date.  |
| `created_at` | datetime | No | The job's created date.  |
| `updated_at` | datetime | No | The job's updated date.  |
| `closed_at` | datetime | No | The job's closed date.  |
| `customer_id` | integer | No | The `id` of attached customer to the job (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the job (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the job (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the job (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the job (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The job's contact first name.  |
| `contact_last_name` | string | No | The job's contact last name.  |
| `street_1` | string | No | The job's location street 1.  |
| `street_2` | string | No | The job's location street 2.  |
| `city` | string | No | The job's location city.  |
| `state_prov` | string | No | The job's location state prov.  |
| `postal_code` | string | No | The job's location postal code.  |
| `location_name` | string | No | The job's location name.  |
| `is_gated` | boolean | No | The job's location is gated flag.  |
| `gate_instructions` | string | No | The job's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the job (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the job (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the job (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `customer_payment_terms` | string | No | The `header` of attached customer payment term to the job (Note: `header` - [string] the customer payment term's fields concatenated by pattern `{name}`).  |
| `project` | string | No | The `header` of attached project to the job (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the job (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The job's po number.  |
| `contract` | string | No | The `header` of attached contract to the job (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The job's note to customer.  |
| `called_in_by` | string | No | The job's called in by.  |
| `is_requires_follow_up` | boolean | No | The job's is requires follow up flag.  |
| `agents` | array | No | The job's agents list.  |
| `custom_fields` | array | No | The job's custom fields list.  |
| `pictures` | array | No | The job's pictures list.  |
| `documents` | array | No | The job's documents list.  |
| `equipment` | array | No | The job's equipments list.  |
| `techs_assigned` | array | No | The job's techs assigned list.  |
| `tasks` | array | No | The job's tasks list.  |
| `notes` | array | No | The job's notes list.  |
| `products` | array | No | The job's products list.  |
| `services` | array | No | The job's services list.  |
| `other_charges` | array | No | The job's other charges list.  |
| `labor_charges` | array | No | The job's labor charges list.  |
| `expenses` | array | No | The job's expenses list.  |
| `payments` | array | No | The job's payments list.  |
| `invoices` | array | No | The job's invoices list.  |
| `signatures` | array | No | The job's signatures list.  |
| `printable_work_order` | array | No | The job's printable work order list.  |
| `visits` | array | No | The job's visits list.  |

### typ.JobBody

A job's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `check_number` | string | No | Used to send the job's check number that will be set.  |
| `priority` | string | No | Used to send the job's priority that will be set.  |
| `description` | string | No | Used to send the job's description that will be set.  |
| `tech_notes` | string | No | Used to send the job's tech notes that will be set.  |
| `completion_notes` | string | No | Used to send the job's completion notes that will be set.  |
| `duration` | integer | No | Used to send the job's duration (in seconds) that will be set.  |
| `time_frame_promised_start` | string | No | Used to send the job's time frame promised start that will be set.  |
| `time_frame_promised_end` | string | No | Used to send the job's time frame promised end that will be set.  |
| `start_date` | datetime | No | Used to send the job's start date that will be set.  |
| `end_date` | datetime | No | Used to send the job's end date that will be set.  |
| `customer_name` | string | Yes | Used to send a customer's `id` or `header` that will be attached to the job (Note: `id` - [integer] the customer's identifier, `header` - [string] the customer's fields concatenated by pattern `{custo |
| `status` | string | No | Used to send a status'es `id` or `header` that will be attached to the job (Note: `id` - [integer] the status'es identifier, `header` - [string] the status'es fields concatenated by pattern `{name}`). |
| `contact_first_name` | string | No | Used to send the job's contact first name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be attached. |
| `contact_last_name` | string | No | Used to send the job's contact last name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be attached.  |
| `street_1` | string | No | Used to send the job's location street 1 that will be set.  |
| `street_2` | string | No | Used to send the job's location street 2 that will be set.  |
| `city` | string | No | Used to send the job's location city that will be set.  |
| `state_prov` | string | No | Used to send the job's location state prov that will be set.  |
| `postal_code` | string | No | Used to send the job's location postal code that will be set.  |
| `location_name` | string | No | Used to send the job's location name that will be set.  |
| `is_gated` | boolean | No | Used to send the job's location is gated flag that will be set.  |
| `gate_instructions` | string | No | Used to send the job's location gate instructions that will be set.  |
| `category` | string | No | Used to send a category's `id` or `header` that will be attached to the job (Note: `id` - [integer] the category's identifier, `header` - [string] the category's fields concatenated by pattern `{categ |
| `source` | string | No | Used to send a source's `id` or `header` that will be attached to the job (Note: `id` - [integer] the source's identifier, `header` - [string] the source's fields concatenated by pattern `{short_name} |
| `payment_type` | string | No | Used to send a payment type's `id` or `header` that will be attached to the job (Note: `id` - [integer] the payment type's identifier, `header` - [string] the payment type's fields concatenated by pat |
| `customer_payment_terms` | string | No | Used to send a customer payment term's `id` or `header` that will be attached to the job (Note: `id` - [integer] the customer payment term's identifier, `header` - [string] the customer payment term's |
| `project` | string | No | Used to send a project's `id` or `header` that will be attached to the job (Note: `id` - [integer] the project's identifier, `header` - [string] the project's fields concatenated by pattern `{name}`). |
| `phase` | string | No | Used to send a phase's `id` or `header` that will be attached to the job (Note: `id` - [integer] the phase's identifier, `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | Used to send the job's po number that will be set.  |
| `contract` | string | No | Used to send a contract's `id` or `header` that will be attached to the job (Note: `id` - [integer] the contract's identifier, `header` - [string] the contract's fields concatenated by pattern `{contr |
| `note_to_customer` | string | No | Used to send the job's note to customer that will be set.  |
| `called_in_by` | string | No | Used to send the job's called in by that will be set.  |
| `is_requires_follow_up` | boolean | No | Used to send the job's is requires follow up flag that will be set.  |
| `agents` | array | No | Used to send the job's agents list that will be set.  |
| `custom_fields` | array | No | Used to send the job's custom fields list that will be set.  |
| `equipment` | array | No | Used to send the job's equipments list that will be set.  |
| `techs_assigned` | array | No | Used to send the job's techs assigned list that will be set.  |
| `tasks` | array | No | Used to send the job's tasks list that will be set.  |
| `notes` | array | No | Used to send the job's notes list that will be set.  |
| `products` | array | No | Used to send the job's products list that will be set.  |
| `services` | array | No | Used to send the job's services list that will be set.  |
| `other_charges` | array | No | Used to send the job's other charges list that will be set.  |
| `labor_charges` | array | No | Used to send the job's labor charges list that will be set.  |
| `expenses` | array | No | Used to send the job's expenses list that will be set.  |

### typ.JobView

A job's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job's identifier.  |
| `number` | string | No | The job's number.  |
| `check_number` | string | No | The job's check number.  |
| `priority` | string | No | The job's priority.  |
| `description` | string | No | The job's description.  |
| `tech_notes` | string | No | The job's tech notes.  |
| `completion_notes` | string | No | The job's completion notes.  |
| `payment_status` | string | No | The job's payment status.  |
| `taxes_fees_total` | number | No | The job's taxes and fees total.  |
| `drive_labor_total` | number | No | The job's drive and labor total.  |
| `billable_expenses_total` | number | No | The job's billable expenses total.  |
| `total` | number | No | The job's total.  |
| `payments_deposits_total` | number | No | The job's payments and deposits total.  |
| `due_total` | number | No | The job's due total.  |
| `cost_total` | number | No | The job's cost total.  |
| `duration` | integer | No | The job's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The job's time frame promised start.  |
| `time_frame_promised_end` | string | No | The job's time frame promised end.  |
| `start_date` | datetime | No | The job's start date.  |
| `end_date` | datetime | No | The job's end date.  |
| `created_at` | datetime | No | The job's created date.  |
| `updated_at` | datetime | No | The job's updated date.  |
| `closed_at` | datetime | No | The job's closed date.  |
| `customer_id` | integer | No | The `id` of attached customer to the job (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the job (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the job (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the job (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the job (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The job's contact first name.  |
| `contact_last_name` | string | No | The job's contact last name.  |
| `street_1` | string | No | The job's location street 1.  |
| `street_2` | string | No | The job's location street 2.  |
| `city` | string | No | The job's location city.  |
| `state_prov` | string | No | The job's location state prov.  |
| `postal_code` | string | No | The job's location postal code.  |
| `location_name` | string | No | The job's location name.  |
| `is_gated` | boolean | No | The job's location is gated flag.  |
| `gate_instructions` | string | No | The job's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the job (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the job (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the job (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `customer_payment_terms` | string | No | The `header` of attached customer payment term to the job (Note: `header` - [string] the customer payment term's fields concatenated by pattern `{name}`).  |
| `project` | string | No | The `header` of attached project to the job (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the job (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The job's po number.  |
| `contract` | string | No | The `header` of attached contract to the job (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The job's note to customer.  |
| `called_in_by` | string | No | The job's called in by.  |
| `is_requires_follow_up` | boolean | No | The job's is requires follow up flag.  |
| `agents` | array | No | The job's agents list.  |
| `custom_fields` | array | No | The job's custom fields list.  |
| `pictures` | array | No | The job's pictures list.  |
| `documents` | array | No | The job's documents list.  |
| `equipment` | array | No | The job's equipments list.  |
| `techs_assigned` | array | No | The job's techs assigned list.  |
| `tasks` | array | No | The job's tasks list.  |
| `notes` | array | No | The job's notes list.  |
| `products` | array | No | The job's products list.  |
| `services` | array | No | The job's services list.  |
| `other_charges` | array | No | The job's other charges list.  |
| `labor_charges` | array | No | The job's labor charges list.  |
| `expenses` | array | No | The job's expenses list.  |
| `payments` | array | No | The job's payments list.  |
| `invoices` | array | No | The job's invoices list.  |
| `signatures` | array | No | The job's signatures list.  |
| `printable_work_order` | array | No | The job's printable work order list.  |
| `visits` | array | No | The job's visits list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.JobCategory

A job category's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job category's identifier.  |
| `name` | string | No | The job category's name.  |

### typ.JobCategoryView

A job category's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job category's identifier.  |
| `name` | string | No | The job category's name.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.JobStatus

A job statuse's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job statuse's identifier.  |
| `code` | string | No | The job statuse's code.  |
| `name` | string | No | The job statuse's name.  |
| `is_custom` | string | No | The job statuse's is custom flag.  |
| `category` | string | No | The `header` of attached category to the status (Note: `header` - [string] the category's fields concatenated by pattern `{code}`).  |

### typ.JobStatusView

A job statuse's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job statuse's identifier.  |
| `code` | string | No | The job statuse's code.  |
| `name` | string | No | The job statuse's name.  |
| `is_custom` | string | No | The job statuse's is custom flag.  |
| `category` | string | No | The `header` of attached category to the status (Note: `header` - [string] the category's fields concatenated by pattern `{code}`).  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.JobDocument

A job document's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The document's name.  |
| `file_location` | string | No | The document's file location.  |
| `doc_type` | string | No | The document's type.  |
| `comment` | string | No | The document's comment.  |
| `sort` | integer | No | The document's sort.  |
| `is_private` | boolean | No | The document's is private flag.  |
| `created_at` | datetime | No | The document's created date.  |
| `updated_at` | datetime | No | The document's updated date.  |
| `customer_doc_id` | integer | No | The `id` of attached customer doc to the document (Note: `id` - [integer] the customer doc's identifier).  |

### typ.JobExpense

A job expense's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `purchased_from` | string | No | The expense's purchased from.  |
| `notes` | string | No | The expense's notes.  |
| `amount` | number | No | The expense's amount.  |
| `is_billable` | boolean | No | The expense's is billable flag.  |
| `date` | datetime | No | The expense's date.  |
| `created_at` | datetime | No | The expense's created date.  |
| `updated_at` | datetime | No | The expense's updated date.  |
| `user` | string | No | The `header` of attached user to the expense (Note: `header` - [string] the user's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `category` | string | No | The `header` of attached category to the expense (Note: `header` - [string] the category's fields concatenated by pattern `{category_name}`).  |
| `qbo_class_id` | integer | No | The `id` of attached qbo class to the expense (Note: `id` - [integer] the qbo class'es identifier).  |
| `qbd_class_id` | integer | No | The `id` of attached qbd class to the expense (Note: `id` - [integer] the qbd class'es identifier).  |

### typ.JobExpenseBody

A job expense's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `purchased_from` | string | No | Used to send the expense's purchased from that will be set.  |
| `notes` | string | No | Used to send the expense's notes that will be set.  |
| `amount` | number | No | Used to send the expense's amount that will be set.  |
| `is_billable` | boolean | No | Used to send the expense's is billable flag that will be set.  |
| `date` | datetime | No | Used to send the expense's date that will be set.  |
| `user` | string | No | Used to send a user's `id` or `header` that will be attached to the expense (Note: `id` - [integer] the user's identifier, `header` - [string] the user's fields concatenated by pattern `{first_name} { |
| `category` | string | No | Used to send a category's `id` or `header` that will be attached to the expense (Note: `id` - [integer] the category's identifier, `header` - [string] the category's fields concatenated by pattern `{c |

### typ.JobLaborCharge

A job labor charge's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `drive_time` | integer | No | The labor charge's drive time.  |
| `drive_time_rate` | number | No | The labor charge's drive time rate.  |
| `drive_time_cost` | number | No | The labor charge's drive time cost.  |
| `drive_time_start` | string | No | The labor charge's drive time start.  |
| `drive_time_end` | string | No | The labor charge's drive time end.  |
| `is_drive_time_billed` | boolean | No | The labor charge's is drive time billed flag.  |
| `labor_time` | integer | No | The labor charge's labor time.  |
| `labor_time_rate` | number | No | The labor charge's labor time rate.  |
| `labor_time_cost` | number | No | The labor charge's labor time cost.  |
| `labor_time_start` | string | No | The labor charge's labor time start.  |
| `labor_time_end` | string | No | The labor charge's labor time end.  |
| `labor_date` | datetime | No | The labor charge's labor date.  |
| `is_labor_time_billed` | boolean | No | The labor charge's is labor time billed flag.  |
| `total` | number | No | The labor charge's total.  |
| `created_at` | datetime | No | The labor charge's created date.  |
| `updated_at` | datetime | No | The labor charge's updated date.  |
| `is_status_generated` | boolean | No | The labor charge's is status generated flag.  |
| `user` | string | No | The `header` of attached user to the labor charge (Note: `header` - [string] the user's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `visit_id` | integer | No | The `id` of attached visit to the labor charge (Note: `id` - [integer] the visit's identifier).  |
| `qbo_class_id` | integer | No | The `id` of attached qbo class to the labor charge (Note: `id` - [integer] the qbo class'es identifier).  |
| `qbd_class_id` | integer | No | The `id` of attached qbd class to the labor charge (Note: `id` - [integer] the qbd class'es identifier).  |

### typ.JobLaborChargeBody

A job labor charge's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `drive_time` | integer | No | Used to send the labor charge's drive time that will be set. Forbidden if drive times start/end passed.  |
| `drive_time_rate` | number | No | Used to send the labor charge's drive time rate that will be set.  |
| `drive_time_cost` | number | No | Used to send the labor charge's drive time cost that will be set.  |
| `drive_time_start` | string | No | Used to send the labor charge's drive time start that will be set. Required if drive time end passed.  |
| `drive_time_end` | string | No | Used to send the labor charge's drive time end that will be set. Required if drive time start passed. Must be greater than drive time start.  |
| `is_drive_time_billed` | boolean | No | Used to send the labor charge's is drive time billed flag that will be set.  |
| `labor_time` | integer | No | Used to send the labor charge's labor time that will be set. Forbidden if labor times start/end passed.  |
| `labor_time_rate` | number | No | Used to send the labor charge's labor time rate that will be set.  |
| `labor_time_cost` | number | No | Used to send the labor charge's labor time cost that will be set.  |
| `labor_time_start` | string | No | Used to send the labor charge's labor time start that will be set. Required if labor time end passed.  |
| `labor_time_end` | string | No | Used to send the labor charge's labor time end that will be set. Required if labor time start passed. Must be greater than labor time start.  |
| `labor_date` | datetime | No | Used to send the labor charge's labor date that will be set.  |
| `is_labor_time_billed` | boolean | No | Used to send the labor charge's is labor time billed flag that will be set.  |
| `user` | string | No | Used to send a user's `id` or `header` that will be attached to the labor charge (Note: `id` - [integer] the user's identifier, `header` - [string] the user's fields concatenated by pattern `{first_na |

### typ.JobNote

A job note's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `notes` | string | No | The note's text.  |
| `created_at` | datetime | No | The note's created date.  |
| `updated_at` | datetime | No | The note's updated date.  |

### typ.JobNoteBody

A job note's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `notes` | string | Yes | Used to send the note's text that will be set.  |

### typ.JobOtherCharge

A job other charge's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The other charge's name.  |
| `rate` | number | No | The other charge's rate.  |
| `total` | number | No | The other charge's total.  |
| `charge_index` | integer | No | The other charge's index.  |
| `parent_index` | integer | No | The other charge's parent index.  |
| `is_percentage` | boolean | No | The other charge's is percentage flag.  |
| `is_discount` | boolean | No | The other charge's is discount flag.  |
| `created_at` | datetime | No | The other charge's created date.  |
| `updated_at` | datetime | No | The other charge's updated date.  |
| `other_charge` | string | No | The `header` of attached other charge to the other charge (Note: `header` - [string] the other charge's fields concatenated by pattern `{short_name}`).  |
| `applies_to` | string | No | The other charge's applies to.  |
| `service_list_id` | integer | No | The `id` of attached service list to the other charge (Note: `id` - [integer] the service list's identifier).  |
| `other_charge_id` | integer | No | The `id` of attached other charge to the other charge (Note: `id` - [integer] the other charge's identifier).  |
| `pattern_row_id` | integer | No | The `id` of attached pattern row to the other charge (Note: `id` - [integer] the pattern row's identifier).  |
| `qbo_class_id` | integer | No | The `id` of attached qbo class to the other charge (Note: `id` - [integer] the qbo class'es identifier).  |
| `qbd_class_id` | integer | No | The `id` of attached qbd class to the other charge (Note: `id` - [integer] the qbd class'es identifier).  |

### typ.JobOtherChargeBody

A job other charge's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Used to send the other charge's name that will be set.  |
| `rate` | number | No | Used to send the other charge's rate that will be set.  |
| `is_percentage` | boolean | No | Used to send the other charge's is percentage flag that will be set.  |
| `other_charge` | string | Yes | Used to send an other charge's `id` or `header` that will be attached to the other charge (Note: `id` - [integer] the other charge's identifier, `header` - [string] the other charge's fields concatena |

### typ.JobProduct

A job product's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The product's name.  |
| `description` | string | No | The product's description.  |
| `multiplier` | integer | No | The product's quantity.  |
| `rate` | number | No | The product's rate.  |
| `total` | number | No | The product's total.  |
| `cost` | number | No | The product's cost.  |
| `actual_cost` | number | No | The product's actual cost.  |
| `item_index` | integer | No | The product's item index.  |
| `parent_index` | integer | No | The product's parent index.  |
| `created_at` | datetime | No | The product's created date.  |
| `updated_at` | datetime | No | The product's updated date.  |
| `is_show_rate_items` | boolean | No | The product's is show rate items flag.  |
| `tax` | string | No | The `header` of attached tax to the product (Note: `header` - [string] the tax'es fields concatenated by pattern `{short_name}`).  |
| `product` | string | No | The `header` of attached product to the product (Note: `header` - [string] the product's fields concatenated by pattern `{make}`).  |
| `product_list_id` | integer | No | The `id` of attached product list to the product (Note: `id` - [integer] the product list's identifier).  |
| `warehouse_id` | integer | No | The `id` of attached warehouse to the product (Note: `id` - [integer] the warehouse's identifier).  |
| `pattern_row_id` | integer | No | The `id` of attached pattern row to the product (Note: `id` - [integer] the pattern row's identifier).  |
| `qbo_class_id` | integer | No | The `id` of attached qbo class to the product (Note: `id` - [integer] the qbo class'es identifier).  |
| `qbd_class_id` | integer | No | The `id` of attached qbd class to the product (Note: `id` - [integer] the qbd class'es identifier).  |

### typ.JobProductBody

A job product's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Used to send the product's name that will be set.  |
| `description` | string | No | Used to send the product's description that will be set.  |
| `multiplier` | integer | No | Used to send the product's quantity that will be set.  |
| `rate` | number | No | Used to send the product's rate that will be set.  |
| `cost` | number | No | Used to send the product's cost that will be set.  |
| `is_show_rate_items` | boolean | No | Used to send the product's is show rate items flag that will be set.  |
| `tax` | string | No | Used to send a tax'es `id` or `header` that will be attached to the product (Note: `id` - [integer] the tax'es identifier, `header` - [string] the tax'es fields concatenated by pattern `{short_name}`) |
| `product` | string | Yes | Used to send a product's `id` or `header` that will be attached to the product (Note: `id` - [integer] the product's identifier, `header` - [string] the product's fields concatenated by pattern `{make |

### typ.JobService

A job service's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The service's name.  |
| `description` | string | No | The service's description.  |
| `multiplier` | integer | No | The service's quantity.  |
| `rate` | number | No | The service's rate.  |
| `total` | number | No | The service's total.  |
| `cost` | number | No | The service's cost.  |
| `actual_cost` | number | No | The service's actual cost.  |
| `item_index` | integer | No | The service's item index.  |
| `parent_index` | integer | No | The service's parent index.  |
| `created_at` | datetime | No | The service's created date.  |
| `updated_at` | datetime | No | The service's updated date.  |
| `is_show_rate_items` | boolean | No | The service's is show rate items flag.  |
| `tax` | string | No | The `header` of attached tax to the service (Note: `header` - [string] the tax'es fields concatenated by pattern `{short_name}`).  |
| `service` | string | No | The `header` of attached service to the service (Note: `header` - [string] the service's fields concatenated by pattern `{short_description}`).  |
| `service_list_id` | integer | No | The `id` of attached service list to the service (Note: `id` - [integer] the service list's identifier).  |
| `service_rate_id` | integer | No | The `id` of attached service rate to the service (Note: `id` - [integer] the service rate's identifier).  |
| `pattern_row_id` | integer | No | The `id` of attached pattern row to the service (Note: `id` - [integer] the pattern row's identifier).  |
| `qbo_class_id` | integer | No | The `id` of attached qbo class to the service (Note: `id` - [integer] the qbo class'es identifier).  |
| `qbd_class_id` | integer | No | The `id` of attached qbd class to the service (Note: `id` - [integer] the qbd class'es identifier).  |

### typ.JobServiceBody

A job service's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Used to send the service's name that will be set.  |
| `description` | string | No | Used to send the service's description that will be set.  |
| `multiplier` | integer | No | Used to send the service's quantity that will be set.  |
| `rate` | number | No | Used to send the service's rate that will be set.  |
| `cost` | number | No | Used to send the service's cost that will be set.  |
| `is_show_rate_items` | boolean | No | Used to send the service's is show rate items flag that will be set.  |
| `tax` | string | No | Used to send a tax'es `id` or `header` that will be attached to the service (Note: `id` - [integer] the tax'es identifier, `header` - [string] the tax'es fields concatenated by pattern `{short_name}`) |
| `service` | string | Yes | Used to send a service's `id` or `header` that will be attached to the service (Note: `id` - [integer] the service's identifier, `header` - [string] the service's fields concatenated by pattern `{shor |

### typ.JobSignature

A job signature's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | No | The signature's type.  |
| `file_name` | string | No | The signature's file name.  |
| `created_at` | datetime | No | The signature's created date.  |
| `updated_at` | datetime | No | The signature's updated date.  |

### typ.JobTag

A job tag's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tag` | string | No | The tag's unique tag.  |
| `created_at` | datetime | No | The tag's created date.  |
| `updated_at` | datetime | No | The tag's updated date.  |

### typ.JobTagBody

A job tag's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tag` | string | Yes | Used to send the tag's unique tag that will be set.  |

### typ.JobTask

A job task's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | No | The task's type.  |
| `description` | string | No | The task's description.  |
| `start_time` | string | No | The task's start time.  |
| `start_date` | datetime | No | The task's start date.  |
| `end_date` | datetime | No | The task's end date.  |
| `is_completed` | boolean | No | The task's is completed flag.  |
| `created_at` | datetime | No | The task's created date.  |
| `updated_at` | datetime | No | The task's updated date.  |

### typ.JobTaskBody

A job task's body schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | Yes | Used to send the task's description that will be set.  |
| `is_completed` | boolean | No | Used to send the task's is completed flag that will be set.  |

### typ.JobVisit

A job visit's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `notes_for_techs` | string | No | The visit's notes for techs.  |
| `time_frame_promised_start` | string | No | The visit's time frame promised start.  |
| `time_frame_promised_end` | string | No | The visit's time frame promised end.  |
| `duration` | integer | No | The visit's duration (in seconds).  |
| `is_text_notified` | boolean | No | The visit's is text notified flag.  |
| `is_voice_notified` | boolean | No | The visit's is voice notified flag.  |
| `start_date` | datetime | No | The visit's start date.  |
| `techs_assigned` | array | No | The visit's techs assigned list.  |

### typ.MeView

An authenticated user's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The authenticated user's identifier.  |
| `first_name` | string | No | The authenticated user's first name.  |
| `last_name` | string | No | The authenticated user's last name.  |
| `email` | string | No | The authenticated user's email.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.Payment

A payment's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `transaction_type` | string | No | The payment's transaction type.  |
| `transaction_token` | string | No | The payment's transaction token.  |
| `transaction_id` | string | No | The `id` of attached transaction to the payment (Note: `id` - [integer] the transaction's identifier).  |
| `payment_transaction_id` | integer | No | The `id` of attached payment transaction to the payment (Note: `id` - [integer] the payment transaction's identifier).  |
| `original_transaction_id` | integer | No | The `id` of attached original transaction to the payment (Note: `id` - [integer] the original transaction's identifier).  |
| `apply_to` | string | No | The payment's apply to.  |
| `amount` | number | No | The payment's amount.  |
| `memo` | string | No | The payment's memo.  |
| `authorization_code` | string | No | The payment's authorization code.  |
| `bill_to_street_address` | string | No | The payment's bill to street address.  |
| `bill_to_postal_code` | string | No | The payment's bill to postal code.  |
| `bill_to_country` | string | No | The payment's bill to country.  |
| `reference_number` | string | No | The payment's reference number.  |
| `is_resync_qbo` | boolean | No | The payment's is resync qbo flag.  |
| `created_at` | datetime | No | The payment's created date.  |
| `updated_at` | datetime | No | The payment's updated date.  |
| `received_on` | datetime | No | The payment's received date.  |
| `qbo_synced_date` | datetime | No | The payment's qbo synced date.  |
| `qbo_id` | integer | No | The `id` of attached qbo class to the payment (Note: `id` - [integer] the qbo class'es identifier).  |
| `qbd_id` | string | No | The `id` of attached qbd class to the payment (Note: `id` - [integer] the qbd class'es identifier).  |
| `customer` | string | No | The `header` of attached customer to the payment (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `type` | string | No | The `header` of attached customer payment method to the payment (Note: `header` - [string] the customer payment method's fields concatenated by pattern `{cc_type} {first_four} {last_four}` with space  |
| `invoice_id` | integer | No | The `id` of attached invoice to the payment (Note: `id` - [integer] the invoice's identifier).  |
| `gateway_id` | integer | No | The `id` of attached gateway to the payment (Note: `id` - [integer] the gateway's identifier).  |
| `receipt_id` | string | No | The `id` of attached receipt to the payment (Note: `id` - [integer] the receipt's identifier).  |

### typ.PaymentType

A payment type's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The type's identifier.  |
| `code` | string | No | The type's code.  |
| `short_name` | string | No | The type's short name.  |
| `type` | string | No | The type's type.  |
| `is_custom` | boolean | No | The type's is custom flag.  |

### typ.PaymentTypeView

A payment type's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The type's identifier.  |
| `code` | string | No | The type's code.  |
| `short_name` | string | No | The type's short name.  |
| `type` | string | No | The type's type.  |
| `is_custom` | boolean | No | The type's is custom flag.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.PrintableWorkOrder

A printable work order's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The printable work order's name.  |
| `url` | string | No | The printable work order's url.  |

### typ.Source

A source's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The source's identifier.  |
| `short_name` | string | No | The source's short name.  |
| `long_name` | string | No | The source's long name.  |

### typ.SourceView

A source's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The source's identifier.  |
| `short_name` | string | No | The source's short name.  |
| `long_name` | string | No | The source's long name.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.Tech

A tech's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The tech's identifier.  |
| `first_name` | string | No | The tech's first name.  |
| `last_name` | string | No | The tech's last name.  |
| `nickname_on_workorder` | string | No | The tech's nickname on workorder.  |
| `nickname_on_dispatch` | string | No | The tech's nickname on dispatch.  |
| `color_code` | string | No | The tech's color code.  |
| `email` | string | No | The tech's email.  |
| `phone_1` | string | No | The tech's phone 1.  |
| `phone_2` | string | No | The tech's phone 2.  |
| `gender` | string | No | The tech's gender.  |
| `department` | string | No | The tech's department.  |
| `title` | string | No | The tech's title.  |
| `bio` | string | No | The tech's bio.  |
| `is_phone_1_mobile` | boolean | No | The tech's is phone 1 mobile flag.  |
| `is_phone_1_visible_to_client` | boolean | No | The tech's is phone 1 visible to client flag.  |
| `is_phone_2_mobile` | boolean | No | The tech's is phone 2 mobile flag.  |
| `is_phone_2_visible_to_client` | boolean | No | The tech's is phone 2 visible to client flag.  |
| `is_sales_rep` | boolean | No | The tech's is sales rep flag.  |
| `is_field_worker` | boolean | No | The tech's is field worker flag.  |
| `created_at` | datetime | No | The tech's created date.  |
| `updated_at` | datetime | No | The tech's updated date.  |

### typ.TechView

A tech's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The tech's identifier.  |
| `first_name` | string | No | The tech's first name.  |
| `last_name` | string | No | The tech's last name.  |
| `nickname_on_workorder` | string | No | The tech's nickname on workorder.  |
| `nickname_on_dispatch` | string | No | The tech's nickname on dispatch.  |
| `color_code` | string | No | The tech's color code.  |
| `email` | string | No | The tech's email.  |
| `phone_1` | string | No | The tech's phone 1.  |
| `phone_2` | string | No | The tech's phone 2.  |
| `gender` | string | No | The tech's gender.  |
| `department` | string | No | The tech's department.  |
| `title` | string | No | The tech's title.  |
| `bio` | string | No | The tech's bio.  |
| `is_phone_1_mobile` | boolean | No | The tech's is phone 1 mobile flag.  |
| `is_phone_1_visible_to_client` | boolean | No | The tech's is phone 1 visible to client flag.  |
| `is_phone_2_mobile` | boolean | No | The tech's is phone 2 mobile flag.  |
| `is_phone_2_visible_to_client` | boolean | No | The tech's is phone 2 visible to client flag.  |
| `is_sales_rep` | boolean | No | The tech's is sales rep flag.  |
| `is_field_worker` | boolean | No | The tech's is field worker flag.  |
| `created_at` | datetime | No | The tech's created date.  |
| `updated_at` | datetime | No | The tech's updated date.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

### typ.Picture

A picture's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The document's name.  |
| `file_location` | string | No | The document's file location.  |
| `doc_type` | string | No | The document's type.  |
| `comment` | string | No | The document's comment.  |
| `sort` | integer | No | The document's sort.  |
| `is_private` | boolean | No | The document's is private flag.  |
| `created_at` | datetime | No | The document's created date.  |
| `updated_at` | datetime | No | The document's updated date.  |
| `customer_doc_id` | integer | No | The `id` of attached customer doc to the document (Note: `id` - [integer] the customer doc's identifier).  |

### typ.Document

A document's schema.


| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | The document's name.  |
| `file_location` | string | No | The document's file location.  |
| `doc_type` | string | No | The document's type.  |
| `comment` | string | No | The document's comment.  |
| `sort` | integer | No | The document's sort.  |
| `is_private` | boolean | No | The document's is private flag.  |
| `created_at` | datetime | No | The document's created date.  |
| `updated_at` | datetime | No | The document's updated date.  |
| `customer_doc_id` | integer | No | The `id` of attached customer doc to the document (Note: `id` - [integer] the customer doc's identifier).  |

---
## API Endpoints

### Table of Contents

- **GET** `/me`
- **GET** `/calendar-tasks`
- **GET** `/calendar-tasks/{calendar-task-id}`
- **POST** `/customers`
- **GET** `/customers`
- **GET** `/customers/{customer-id}`
- **GET** `/customers/{customer-id}/equipment`
- **GET** `/customers/{customer-id}/equipment/{equipment-id}`
- **POST** `/jobs`
- **GET** `/jobs`
- **GET** `/jobs/{job-id}`
- **GET** `/job-categories`
- **GET** `/job-categories/{job-category-id}`
- **GET** `/job-statuses`
- **GET** `/job-statuses/{job-status-id}`
- **POST** `/estimates`
- **GET** `/estimates`
- **GET** `/estimates/{estimate-id}`
- **GET** `/invoices`
- **GET** `/invoices/{invoice-id}`
- **GET** `/payment-types`
- **GET** `/payment-types/{payment-type-id}`
- **GET** `/sources`
- **GET** `/sources/{source-id}`
- **GET** `/techs`
- **GET** `/techs/{tech-id}`

---

## /me


### GET /me

Authorized user information.


**Traits**: tra.me-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `first_name`, `last_name`, `email` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The authenticated user's identifier.  |
| `first_name` | string | No | The authenticated user's first name.  |
| `last_name` | string | No | The authenticated user's last name.  |
| `email` | string | No | The authenticated user's email.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /calendar-tasks


### GET /calendar-tasks

List all CalendarTasks matching query criteria, if provided,
otherwise list all CalendarTasks.


**Traits**: tra.calendarTask-fieldable, tra.calendarTask-sortable, tra.calendarTask-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `type`, `description`, `start_time`, `end_time`, `start_date`, `end_date`, `created_at`, `updated_at`, `is_public`, `is_completed`, `repeat_id`, `users_id`, `customers_id`, `jobs_id`, `estimates_id` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `repeat` |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `type`, `description`, `start_time`, `end_time`, `start_date`, `end_date`, `created_at`, `updated_at`, `is_public`, `is_completed`, `repeat_id` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /calendar-tasks/{calendar-task-id}

Get a CalendarTask by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `calendar-task-id` | integer | Yes | Used to send an identifier of the CalendarTask to be used.  |

### GET /calendar-tasks/{calendar-task-id}

Get a CalendarTask by identifier.


**Traits**: tra.calendarTask-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `type`, `description`, `start_time`, `end_time`, `start_date`, `end_date`, `created_at`, `updated_at`, `is_public`, `is_completed`, `repeat_id`, `users_id`, `customers_id`, `jobs_id`, `estimates_id` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `repeat` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The calendar task's identifier.  |
| `type` | string | No | The calendar task's type.  |
| `description` | string | No | The calendar task's description.  |
| `start_time` | string | No | The calendar task's start time.  |
| `end_time` | string | No | The calendar task's end time.  |
| `start_date` | datetime | No | The calendar task's start date.  |
| `end_date` | datetime | No | The calendar task's end date.  |
| `created_at` | datetime | No | The calendar task's created date.  |
| `updated_at` | datetime | No | The calendar task's updated date.  |
| `is_public` | boolean | No | The calendar task's is public flag.  |
| `is_completed` | boolean | No | The calendar task's is completed flag.  |
| `repeat_id` | integer | No | The calendar task's repeat id.  |
| `users_id` | array | Yes | The calendar task's users list of identifiers.  |
| `customers_id` | array | Yes | The calendar task's customers list of identifiers.  |
| `jobs_id` | array | Yes | The calendar task's jobs list of identifiers.  |
| `estimates_id` | array | Yes | The calendar task's estimates list of identifiers.  |
| `repeat` | object | No | The calendar task's repeat.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /customers


### POST /customers

Create a new Customer.


**Traits**: tra.customer-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `customer_name`, `fully_qualified_name`, `account_number`, `account_balance`, `private_notes`, `public_notes`, `payment_terms`, `discount`, `discount_type`, `credit_rating`, `labor_charge_type`, `labor_charge_default_rate`, `qbo_sync_token`, `qbo_currency`, `qbo_id`, `qbd_id`, `created_at`, `updated_at`, `last_serviced_date`, `is_bill_for_drive_time`, `is_vip`, `is_taxable`, `parent_customer`, `referral_source`, `agent`, `assigned_contract`, `payment_type`, `tax_item_name`, `industry` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `contacts`, `contacts.phones`, `contacts.emails`, `locations`, `custom_fields` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Request Body:**
- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customer_name` | string | Yes | Used to send the customer's name that will be set.  |
| `parent_customer` | string | No | Used to send a parent customer's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the parent customer's identifier, `header` - [string] the parent customer's fields conca |
| `account_number` | string | No | Used to send the customer's account number that will be set.  |
| `private_notes` | string | No | Used to send the customer's private notes that will be set.  |
| `public_notes` | string | No | Used to send the customer's public notes that will be set.  |
| `credit_rating` | string | No | Used to send the customer's credit rating that will be set.  |
| `labor_charge_type` | string | No | Used to send the customer's labor charge type that will be set.  |
| `labor_charge_default_rate` | number | No | Used to send the customer's labor charge default rate that will be set.  |
| `last_serviced_date` | datetime | No | Used to send the customer's last serviced date that will be set.  |
| `is_bill_for_drive_time` | boolean | No | Used to send the customer's is bill for drive time flag that will be set.  |
| `is_vip` | boolean | No | Used to send the customer's is vip flag that will be set.  |
| `referral_source` | string | No | Used to send a referral source's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the referral source's identifier, `header` - [string] the referral source's fields conca |
| `agent` | string | No | Used to send an agent's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the agent's identifier, `header` - [string] the agent's fields concatenated by pattern `{first_na |
| `discount` | number | No | Used to send the customer's discount that will be set.  |
| `discount_type` | string | No | Used to send the customer's discount type that will be set.  |
| `payment_type` | string | No | Used to send a payment type's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the payment type's identifier, `header` - [string] the payment type's fields concatenated b |
| `payment_terms` | string | No | Used to send the customer's payment terms that will be set.  |
| `assigned_contract` | string | No | Used to send an assigned contract's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the assigned contract's identifier, `header` - [string] the assigned contract's field |
| `industry` | string | No | Used to send an industry's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the industry's identifier, `header` - [string] the industry's fields concatenated by pattern ` |
| `is_taxable` | boolean | No | Used to send the customer's is taxable flag that will be set.  |
| `tax_item_name` | string | No | Used to send a tax item's `id` or `header` that will be attached to the customer (Note: `id` - [integer] the tax item's identifier, `header` - [string] the tax item's fields concatenated by pattern `{ |
| `qbo_sync_token` | integer | No | Used to send the customer's qbo sync token that will be set.  |
| `qbo_currency` | string | No | Used to send the customer's qbo currency that will be set.  |
| `contacts` | array | No | Used to send the customer's contacts list that will be set.  |
| `locations` | array | No | Used to send the customer's locations list that will be set.  |
| `custom_fields` | array | No | Used to send the customer's custom fields list that will be set.  |

**Responses:**

#### 201
### 201 Created (Success)
The request has been fulfilled, resulting in the creation of a new resource.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The customer's identifier.  |
| `customer_name` | string | No | The customer's name.  |
| `fully_qualified_name` | string | No | The customer's fully qualified name.  |
| `parent_customer` | string | No | The `header` of attached parent customer to the customer (Note: `header` - [string] the parent customer's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `account_number` | string | No | The customer's account number.  |
| `account_balance` | number | No | The customer's account balance.  |
| `private_notes` | string | No | The customer's private notes.  |
| `public_notes` | string | No | The customer's public notes.  |
| `credit_rating` | string | No | The customer's credit rating.  |
| `labor_charge_type` | string | No | The customer's labor charge type.  |
| `labor_charge_default_rate` | number | No | The customer's labor charge default rate.  |
| `last_serviced_date` | datetime | No | The customer's last serviced date.  |
| `is_bill_for_drive_time` | boolean | No | The customer's is bill for drive time flag.  |
| `is_vip` | boolean | No | The customer's is vip flag.  |
| `referral_source` | string | No | The `header` of attached referral source to the customer (Note: `header` - [string] the referral source's fields concatenated by pattern `{short_name}`).  |
| `agent` | string | No | The `header` of attached agent to the customer (Note: `header` - [string] the agent's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `discount` | number | No | The customer's discount.  |
| `discount_type` | string | No | The customer's discount type.  |
| `payment_type` | string | No | The `header` of attached payment type to the customer (Note: `header` - [string] the payment type's fields concatenated by pattern `{name}`).  |
| `payment_terms` | string | No | The customer's payment terms.  |
| `assigned_contract` | string | No | The `header` of attached contract to the customer (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `industry` | string | No | The `header` of attached industry to the customer (Note: `header` - [string] the industry's fields concatenated by pattern `{industry}`).  |
| `is_taxable` | boolean | No | The customer's is taxable flag.  |
| `tax_item_name` | string | No | The `header` of attached tax item to the customer (Note: `header` - [string] the tax item's fields concatenated by pattern `{short_name}` with space as separator).  |
| `qbo_sync_token` | integer | No | The customer's qbo sync token.  |
| `qbo_currency` | string | No | The customer's qbo currency.  |
| `qbo_id` | integer | No | The customer's qbo id.  |
| `qbd_id` | string | No | The customer's qbd id.  |
| `created_at` | datetime | No | The customer's created date.  |
| `updated_at` | datetime | No | The customer's updated date.  |
| `contacts` | array | No | The customer's contacts list.  |
| `locations` | array | No | The customer's locations list.  |
| `custom_fields` | array | No | The customer's custom fields list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 422
### 422 Unprocessable Entity (Client Error)
The request was well-formed but was unable to be followed due to semantic errors.

- Type: `array`

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### GET /customers

List all Customers matching query criteria, if provided,
otherwise list all Customers.


**Traits**: tra.customer-fieldable, tra.customer-sortable, tra.customer-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `customer_name`, `fully_qualified_name`, `account_number`, `account_balance`, `private_notes`, `public_notes`, `payment_terms`, `discount`, `discount_type`, `credit_rating`, `labor_charge_type`, `labor_charge_default_rate`, `qbo_sync_token`, `qbo_currency`, `qbo_id`, `qbd_id`, `created_at`, `updated_at`, `last_serviced_date`, `is_bill_for_drive_time`, `is_vip`, `is_taxable`, `parent_customer`, `referral_source`, `agent`, `assigned_contract`, `payment_type`, `tax_item_name`, `industry` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `contacts`, `contacts.phones`, `contacts.emails`, `locations`, `custom_fields` |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `customer_name`, `fully_qualified_name`, `account_number`, `private_notes`, `public_notes`, `payment_terms`, `discount`, `discount_type`, `credit_rating`, `labor_charge_type`, `labor_charge_default_rate`, `qbo_sync_token`, `qbo_currency`, `qbo_id`, `qbd_id`, `created_at`, `updated_at`, `last_serviced_date`, `is_bill_for_drive_time`, `is_vip`, `is_taxable`, `parent_customer`, `referral_source`, `agent`, `assigned_contract`, `payment_type`, `tax_item_name`, `industry` |
| `filters[name]` | string | No | - | Used to filter results by given name (partial match).  |
| `filters[contact_first_name]` | string | No | - | Used to filter results by given contact's first name (partial match).  |
| `filters[contact_last_name]` | string | No | - | Used to filter results by given contact's last name (partial match).  |
| `filters[address]` | string | No | - | Used to filter results by given address (partial match).  |
| `filters[city]` | string | No | - | Used to filter results by given city (full match).  |
| `filters[postal_code]` | integer | No | - | Used to filter results by given postal code (full match).  |
| `filters[phone]` | string | No | - | Used to filter results by given phone (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (full match).  |
| `filters[tags]` | string | No | - | Used to filter results by given tags (full match). Accepted value is comma-separated string.  |
| `filters[last_serviced_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of last serviced date (format: `Y-m-d`).  |
| `filters[last_serviced_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of last serviced date (format: `Y-m-d`).  |
| `filters[agreement_date_effective][lte]` | string | No | - | Used to filter results by given `less than or equal` of agreement date effective (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[agreement_date_effective][gte]` | string | No | - | Used to filter results by given `greater than or equal` of agreement date effective (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[agreement_date_expires][lte]` | string | No | - | Used to filter results by given `less than or equal` of agreement date expires (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[agreement_date_expires][gte]` | string | No | - | Used to filter results by given `greater than or equal` of agreement date expires (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /customers/{customer-id}

Get a Customer by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customer-id` | integer | Yes | Used to send an identifier of the Customer to be used.  |

### GET /customers/{customer-id}

Get a Customer by identifier.


**Traits**: tra.customer-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `customer_name`, `fully_qualified_name`, `account_number`, `account_balance`, `private_notes`, `public_notes`, `payment_terms`, `discount`, `discount_type`, `credit_rating`, `labor_charge_type`, `labor_charge_default_rate`, `qbo_sync_token`, `qbo_currency`, `qbo_id`, `qbd_id`, `created_at`, `updated_at`, `last_serviced_date`, `is_bill_for_drive_time`, `is_vip`, `is_taxable`, `parent_customer`, `referral_source`, `agent`, `assigned_contract`, `payment_type`, `tax_item_name`, `industry` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `contacts`, `contacts.phones`, `contacts.emails`, `locations`, `custom_fields` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The customer's identifier.  |
| `customer_name` | string | No | The customer's name.  |
| `fully_qualified_name` | string | No | The customer's fully qualified name.  |
| `parent_customer` | string | No | The `header` of attached parent customer to the customer (Note: `header` - [string] the parent customer's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `account_number` | string | No | The customer's account number.  |
| `account_balance` | number | No | The customer's account balance.  |
| `private_notes` | string | No | The customer's private notes.  |
| `public_notes` | string | No | The customer's public notes.  |
| `credit_rating` | string | No | The customer's credit rating.  |
| `labor_charge_type` | string | No | The customer's labor charge type.  |
| `labor_charge_default_rate` | number | No | The customer's labor charge default rate.  |
| `last_serviced_date` | datetime | No | The customer's last serviced date.  |
| `is_bill_for_drive_time` | boolean | No | The customer's is bill for drive time flag.  |
| `is_vip` | boolean | No | The customer's is vip flag.  |
| `referral_source` | string | No | The `header` of attached referral source to the customer (Note: `header` - [string] the referral source's fields concatenated by pattern `{short_name}`).  |
| `agent` | string | No | The `header` of attached agent to the customer (Note: `header` - [string] the agent's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `discount` | number | No | The customer's discount.  |
| `discount_type` | string | No | The customer's discount type.  |
| `payment_type` | string | No | The `header` of attached payment type to the customer (Note: `header` - [string] the payment type's fields concatenated by pattern `{name}`).  |
| `payment_terms` | string | No | The customer's payment terms.  |
| `assigned_contract` | string | No | The `header` of attached contract to the customer (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `industry` | string | No | The `header` of attached industry to the customer (Note: `header` - [string] the industry's fields concatenated by pattern `{industry}`).  |
| `is_taxable` | boolean | No | The customer's is taxable flag.  |
| `tax_item_name` | string | No | The `header` of attached tax item to the customer (Note: `header` - [string] the tax item's fields concatenated by pattern `{short_name}` with space as separator).  |
| `qbo_sync_token` | integer | No | The customer's qbo sync token.  |
| `qbo_currency` | string | No | The customer's qbo currency.  |
| `qbo_id` | integer | No | The customer's qbo id.  |
| `qbd_id` | string | No | The customer's qbd id.  |
| `created_at` | datetime | No | The customer's created date.  |
| `updated_at` | datetime | No | The customer's updated date.  |
| `contacts` | array | No | The customer's contacts list.  |
| `locations` | array | No | The customer's locations list.  |
| `custom_fields` | array | No | The customer's custom fields list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /customers/{customer-id}/equipment


### GET /customers/{customer-id}/equipment

List all Equipment matching query criteria, if provided,
otherwise list all Equipment.


**Traits**: tra.equipment-fieldable, tra.equipment-sortable, tra.equipment-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `type`, `make`, `model`, `sku`, `serial_number`, `location`, `notes`, `extended_warranty_provider`, `is_extended_warranty`, `extended_warranty_date`, `warranty_date`, `install_date`, `created_at`, `updated_at`, `customer_id`, `customer`, `customer_location` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `custom_fields` |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `type`, `make`, `model`, `sku`, `serial_number`, `location`, `notes`, `extended_warranty_provider`, `is_extended_warranty`, `extended_warranty_date`, `warranty_date`, `install_date`, `created_at`, `updated_at`, `customer_id`, `customer`, `customer_location` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /customers/{customer-id}/equipment/{equipment-id}

Get a Equipment by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `equipment-id` | integer | Yes | Used to send an identifier of the Equipment to be used.  |

### GET /customers/{customer-id}/equipment/{equipment-id}

Get a Equipment by identifier.


**Traits**: tra.equipment-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `type`, `make`, `model`, `sku`, `serial_number`, `location`, `notes`, `extended_warranty_provider`, `is_extended_warranty`, `extended_warranty_date`, `warranty_date`, `install_date`, `created_at`, `updated_at`, `customer_id`, `customer`, `customer_location` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `custom_fields` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The equipment's identifier.  |
| `type` | string | No | The equipment's type.  |
| `make` | string | No | The equipment's make.  |
| `model` | string | No | The equipment's model.  |
| `sku` | string | No | The equipment's sku.  |
| `serial_number` | string | No | The equipment's serial number.  |
| `location` | string | No | The equipment's location.  |
| `notes` | string | No | The equipment's notes.  |
| `extended_warranty_provider` | string | No | The equipment's extended warranty provider.  |
| `is_extended_warranty` | boolean | No | The equipment's is extended warranty flag.  |
| `extended_warranty_date` | datetime | No | The equipment's extended warranty date.  |
| `warranty_date` | datetime | No | The equipment's warranty date.  |
| `install_date` | datetime | No | The equipment's install date.  |
| `created_at` | datetime | No | The equipment's created date.  |
| `updated_at` | datetime | No | The equipment's updated date.  |
| `customer_id` | integer | No | The `id` of attached customer to the equipment (Note: `id` - [integer] the customer's identifier).  |
| `customer` | string | No | The `header` of attached customer to the equipment (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `customer_location` | string | No | The `header` of attached customer location to the equipment (Note: `header` - [string] the customer location's fields concatenated by pattern `{nickname} {street_1} {city}` with space as separator).  |
| `custom_fields` | array | No | The equipment's custom fields list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /jobs


### POST /jobs

Create a new Job.


**Traits**: tra.job-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `check_number`, `priority`, `description`, `tech_notes`, `completion_notes`, `payment_status`, `taxes_fees_total`, `drive_labor_total`, `billable_expenses_total`, `total`, `payments_deposits_total`, `due_total`, `cost_total`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `end_date`, `created_at`, `updated_at`, `closed_at`, `customer_id`, `customer_name`, `parent_customer`, `status`, `sub_status`, `contact_first_name`, `contact_last_name`, `street_1`, `street_2`, `city`, `state_prov`, `postal_code`, `location_name`, `is_gated`, `gate_instructions`, `category`, `source`, `payment_type`, `customer_payment_terms`, `project`, `phase`, `po_number`, `contract`, `note_to_customer`, `called_in_by`, `is_requires_follow_up` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `agents`, `custom_fields`, `pictures`, `documents`, `equipment`, `equipment.custom_fields`, `techs_assigned`, `tasks`, `notes`, `products`, `services`, `other_charges`, `labor_charges`, `expenses`, `payments`, `invoices`, `signatures`, `printable_work_order`, `visits`, `visits.techs_assigned` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Request Body:**
- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `check_number` | string | No | Used to send the job's check number that will be set.  |
| `priority` | string | No | Used to send the job's priority that will be set.  |
| `description` | string | No | Used to send the job's description that will be set.  |
| `tech_notes` | string | No | Used to send the job's tech notes that will be set.  |
| `completion_notes` | string | No | Used to send the job's completion notes that will be set.  |
| `duration` | integer | No | Used to send the job's duration (in seconds) that will be set.  |
| `time_frame_promised_start` | string | No | Used to send the job's time frame promised start that will be set.  |
| `time_frame_promised_end` | string | No | Used to send the job's time frame promised end that will be set.  |
| `start_date` | datetime | No | Used to send the job's start date that will be set.  |
| `end_date` | datetime | No | Used to send the job's end date that will be set.  |
| `customer_name` | string | Yes | Used to send a customer's `id` or `header` that will be attached to the job (Note: `id` - [integer] the customer's identifier, `header` - [string] the customer's fields concatenated by pattern `{custo |
| `status` | string | No | Used to send a status'es `id` or `header` that will be attached to the job (Note: `id` - [integer] the status'es identifier, `header` - [string] the status'es fields concatenated by pattern `{name}`). |
| `contact_first_name` | string | No | Used to send the job's contact first name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be attached. |
| `contact_last_name` | string | No | Used to send the job's contact last name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be attached.  |
| `street_1` | string | No | Used to send the job's location street 1 that will be set.  |
| `street_2` | string | No | Used to send the job's location street 2 that will be set.  |
| `city` | string | No | Used to send the job's location city that will be set.  |
| `state_prov` | string | No | Used to send the job's location state prov that will be set.  |
| `postal_code` | string | No | Used to send the job's location postal code that will be set.  |
| `location_name` | string | No | Used to send the job's location name that will be set.  |
| `is_gated` | boolean | No | Used to send the job's location is gated flag that will be set.  |
| `gate_instructions` | string | No | Used to send the job's location gate instructions that will be set.  |
| `category` | string | No | Used to send a category's `id` or `header` that will be attached to the job (Note: `id` - [integer] the category's identifier, `header` - [string] the category's fields concatenated by pattern `{categ |
| `source` | string | No | Used to send a source's `id` or `header` that will be attached to the job (Note: `id` - [integer] the source's identifier, `header` - [string] the source's fields concatenated by pattern `{short_name} |
| `payment_type` | string | No | Used to send a payment type's `id` or `header` that will be attached to the job (Note: `id` - [integer] the payment type's identifier, `header` - [string] the payment type's fields concatenated by pat |
| `customer_payment_terms` | string | No | Used to send a customer payment term's `id` or `header` that will be attached to the job (Note: `id` - [integer] the customer payment term's identifier, `header` - [string] the customer payment term's |
| `project` | string | No | Used to send a project's `id` or `header` that will be attached to the job (Note: `id` - [integer] the project's identifier, `header` - [string] the project's fields concatenated by pattern `{name}`). |
| `phase` | string | No | Used to send a phase's `id` or `header` that will be attached to the job (Note: `id` - [integer] the phase's identifier, `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | Used to send the job's po number that will be set.  |
| `contract` | string | No | Used to send a contract's `id` or `header` that will be attached to the job (Note: `id` - [integer] the contract's identifier, `header` - [string] the contract's fields concatenated by pattern `{contr |
| `note_to_customer` | string | No | Used to send the job's note to customer that will be set.  |
| `called_in_by` | string | No | Used to send the job's called in by that will be set.  |
| `is_requires_follow_up` | boolean | No | Used to send the job's is requires follow up flag that will be set.  |
| `agents` | array | No | Used to send the job's agents list that will be set.  |
| `custom_fields` | array | No | Used to send the job's custom fields list that will be set.  |
| `equipment` | array | No | Used to send the job's equipments list that will be set.  |
| `techs_assigned` | array | No | Used to send the job's techs assigned list that will be set.  |
| `tasks` | array | No | Used to send the job's tasks list that will be set.  |
| `notes` | array | No | Used to send the job's notes list that will be set.  |
| `products` | array | No | Used to send the job's products list that will be set.  |
| `services` | array | No | Used to send the job's services list that will be set.  |
| `other_charges` | array | No | Used to send the job's other charges list that will be set.  |
| `labor_charges` | array | No | Used to send the job's labor charges list that will be set.  |
| `expenses` | array | No | Used to send the job's expenses list that will be set.  |

**Responses:**

#### 201
### 201 Created (Success)
The request has been fulfilled, resulting in the creation of a new resource.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job's identifier.  |
| `number` | string | No | The job's number.  |
| `check_number` | string | No | The job's check number.  |
| `priority` | string | No | The job's priority.  |
| `description` | string | No | The job's description.  |
| `tech_notes` | string | No | The job's tech notes.  |
| `completion_notes` | string | No | The job's completion notes.  |
| `payment_status` | string | No | The job's payment status.  |
| `taxes_fees_total` | number | No | The job's taxes and fees total.  |
| `drive_labor_total` | number | No | The job's drive and labor total.  |
| `billable_expenses_total` | number | No | The job's billable expenses total.  |
| `total` | number | No | The job's total.  |
| `payments_deposits_total` | number | No | The job's payments and deposits total.  |
| `due_total` | number | No | The job's due total.  |
| `cost_total` | number | No | The job's cost total.  |
| `duration` | integer | No | The job's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The job's time frame promised start.  |
| `time_frame_promised_end` | string | No | The job's time frame promised end.  |
| `start_date` | datetime | No | The job's start date.  |
| `end_date` | datetime | No | The job's end date.  |
| `created_at` | datetime | No | The job's created date.  |
| `updated_at` | datetime | No | The job's updated date.  |
| `closed_at` | datetime | No | The job's closed date.  |
| `customer_id` | integer | No | The `id` of attached customer to the job (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the job (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the job (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the job (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the job (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The job's contact first name.  |
| `contact_last_name` | string | No | The job's contact last name.  |
| `street_1` | string | No | The job's location street 1.  |
| `street_2` | string | No | The job's location street 2.  |
| `city` | string | No | The job's location city.  |
| `state_prov` | string | No | The job's location state prov.  |
| `postal_code` | string | No | The job's location postal code.  |
| `location_name` | string | No | The job's location name.  |
| `is_gated` | boolean | No | The job's location is gated flag.  |
| `gate_instructions` | string | No | The job's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the job (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the job (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the job (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `customer_payment_terms` | string | No | The `header` of attached customer payment term to the job (Note: `header` - [string] the customer payment term's fields concatenated by pattern `{name}`).  |
| `project` | string | No | The `header` of attached project to the job (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the job (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The job's po number.  |
| `contract` | string | No | The `header` of attached contract to the job (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The job's note to customer.  |
| `called_in_by` | string | No | The job's called in by.  |
| `is_requires_follow_up` | boolean | No | The job's is requires follow up flag.  |
| `agents` | array | No | The job's agents list.  |
| `custom_fields` | array | No | The job's custom fields list.  |
| `pictures` | array | No | The job's pictures list.  |
| `documents` | array | No | The job's documents list.  |
| `equipment` | array | No | The job's equipments list.  |
| `techs_assigned` | array | No | The job's techs assigned list.  |
| `tasks` | array | No | The job's tasks list.  |
| `notes` | array | No | The job's notes list.  |
| `products` | array | No | The job's products list.  |
| `services` | array | No | The job's services list.  |
| `other_charges` | array | No | The job's other charges list.  |
| `labor_charges` | array | No | The job's labor charges list.  |
| `expenses` | array | No | The job's expenses list.  |
| `payments` | array | No | The job's payments list.  |
| `invoices` | array | No | The job's invoices list.  |
| `signatures` | array | No | The job's signatures list.  |
| `printable_work_order` | array | No | The job's printable work order list.  |
| `visits` | array | No | The job's visits list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 422
### 422 Unprocessable Entity (Client Error)
The request was well-formed but was unable to be followed due to semantic errors.

- Type: `array`

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### GET /jobs

List all Jobs matching query criteria, if provided,
otherwise list all Jobs.


**Traits**: tra.job-fieldable, tra.job-sortable, tra.job-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `check_number`, `priority`, `description`, `tech_notes`, `completion_notes`, `payment_status`, `taxes_fees_total`, `drive_labor_total`, `billable_expenses_total`, `total`, `payments_deposits_total`, `due_total`, `cost_total`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `end_date`, `created_at`, `updated_at`, `closed_at`, `customer_id`, `customer_name`, `parent_customer`, `status`, `sub_status`, `contact_first_name`, `contact_last_name`, `street_1`, `street_2`, `city`, `state_prov`, `postal_code`, `location_name`, `is_gated`, `gate_instructions`, `category`, `source`, `payment_type`, `customer_payment_terms`, `project`, `phase`, `po_number`, `contract`, `note_to_customer`, `called_in_by`, `is_requires_follow_up` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `agents`, `custom_fields`, `pictures`, `documents`, `equipment`, `equipment.custom_fields`, `techs_assigned`, `tasks`, `notes`, `products`, `services`, `other_charges`, `labor_charges`, `expenses`, `payments`, `invoices`, `signatures`, `printable_work_order`, `visits`, `visits.techs_assigned` |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `number`, `po_number`, `check_number`, `description`, `tech_notes`, `completion_notes`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `end_date`, `created_at`, `updated_at`, `closed_at`, `customer_id`, `customer_name`, `status`, `sub_status`, `category`, `source`, `payment_type`, `customer_payment_terms`, `contract`, `called_in_by` |
| `filters[status]` | string | No | - | Used to filter results by given statuses (full match). Accepted value is comma-separated string.  |
| `filters[number]` | string | No | - | Used to filter results by given number (partial match).  |
| `filters[po_number]` | string | No | - | Used to filter results by given po number (partial match).  |
| `filters[invoice_number]` | string | No | - | Used to filter results by given invoice number (partial match).  |
| `filters[customer_name]` | string | No | - | Used to filter results by given customer's name (partial match).  |
| `filters[parent_customer_name]` | string | No | - | Used to filter results by given parent customer's name (partial match).  |
| `filters[contact_first_name]` | string | No | - | Used to filter results by given contact's first name (partial match).  |
| `filters[contact_last_name]` | string | No | - | Used to filter results by given contact's last name (partial match).  |
| `filters[address]` | string | No | - | Used to filter results by given address (partial match).  |
| `filters[city]` | string | No | - | Used to filter results by given city (full match).  |
| `filters[zip_code]` | integer | No | - | Used to filter results by given zip code (full match).  |
| `filters[phone]` | string | No | - | Used to filter results by given phone (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (full match).  |
| `filters[category]` | string | No | - | Used to filter results by given categories (full match). Accepted value is comma-separated string.  |
| `filters[source]` | string | No | - | Used to filter results by given sources (full match). Accepted value is comma-separated string.  |
| `filters[start_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of start date (format: `Y-m-d`).  |
| `filters[start_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of start date (format: `Y-m-d`).  |
| `filters[end_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of end date (format: `Y-m-d`).  |
| `filters[end_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of end date (format: `Y-m-d`).  |
| `filters[updated_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of updated date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[updated_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of updated date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[closed_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of closed date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[closed_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of closed date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /jobs/{job-id}

Get a Job by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `job-id` | integer | Yes | Used to send an identifier of the Job to be used.  |

### GET /jobs/{job-id}

Get a Job by identifier.


**Traits**: tra.job-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `check_number`, `priority`, `description`, `tech_notes`, `completion_notes`, `payment_status`, `taxes_fees_total`, `drive_labor_total`, `billable_expenses_total`, `total`, `payments_deposits_total`, `due_total`, `cost_total`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `end_date`, `created_at`, `updated_at`, `closed_at`, `customer_id`, `customer_name`, `parent_customer`, `status`, `sub_status`, `contact_first_name`, `contact_last_name`, `street_1`, `street_2`, `city`, `state_prov`, `postal_code`, `location_name`, `is_gated`, `gate_instructions`, `category`, `source`, `payment_type`, `customer_payment_terms`, `project`, `phase`, `po_number`, `contract`, `note_to_customer`, `called_in_by`, `is_requires_follow_up` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `agents`, `custom_fields`, `pictures`, `documents`, `equipment`, `equipment.custom_fields`, `techs_assigned`, `tasks`, `notes`, `products`, `services`, `other_charges`, `labor_charges`, `expenses`, `payments`, `invoices`, `signatures`, `printable_work_order`, `visits`, `visits.techs_assigned` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job's identifier.  |
| `number` | string | No | The job's number.  |
| `check_number` | string | No | The job's check number.  |
| `priority` | string | No | The job's priority.  |
| `description` | string | No | The job's description.  |
| `tech_notes` | string | No | The job's tech notes.  |
| `completion_notes` | string | No | The job's completion notes.  |
| `payment_status` | string | No | The job's payment status.  |
| `taxes_fees_total` | number | No | The job's taxes and fees total.  |
| `drive_labor_total` | number | No | The job's drive and labor total.  |
| `billable_expenses_total` | number | No | The job's billable expenses total.  |
| `total` | number | No | The job's total.  |
| `payments_deposits_total` | number | No | The job's payments and deposits total.  |
| `due_total` | number | No | The job's due total.  |
| `cost_total` | number | No | The job's cost total.  |
| `duration` | integer | No | The job's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The job's time frame promised start.  |
| `time_frame_promised_end` | string | No | The job's time frame promised end.  |
| `start_date` | datetime | No | The job's start date.  |
| `end_date` | datetime | No | The job's end date.  |
| `created_at` | datetime | No | The job's created date.  |
| `updated_at` | datetime | No | The job's updated date.  |
| `closed_at` | datetime | No | The job's closed date.  |
| `customer_id` | integer | No | The `id` of attached customer to the job (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the job (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the job (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the job (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the job (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The job's contact first name.  |
| `contact_last_name` | string | No | The job's contact last name.  |
| `street_1` | string | No | The job's location street 1.  |
| `street_2` | string | No | The job's location street 2.  |
| `city` | string | No | The job's location city.  |
| `state_prov` | string | No | The job's location state prov.  |
| `postal_code` | string | No | The job's location postal code.  |
| `location_name` | string | No | The job's location name.  |
| `is_gated` | boolean | No | The job's location is gated flag.  |
| `gate_instructions` | string | No | The job's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the job (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the job (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the job (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `customer_payment_terms` | string | No | The `header` of attached customer payment term to the job (Note: `header` - [string] the customer payment term's fields concatenated by pattern `{name}`).  |
| `project` | string | No | The `header` of attached project to the job (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the job (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The job's po number.  |
| `contract` | string | No | The `header` of attached contract to the job (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The job's note to customer.  |
| `called_in_by` | string | No | The job's called in by.  |
| `is_requires_follow_up` | boolean | No | The job's is requires follow up flag.  |
| `agents` | array | No | The job's agents list.  |
| `custom_fields` | array | No | The job's custom fields list.  |
| `pictures` | array | No | The job's pictures list.  |
| `documents` | array | No | The job's documents list.  |
| `equipment` | array | No | The job's equipments list.  |
| `techs_assigned` | array | No | The job's techs assigned list.  |
| `tasks` | array | No | The job's tasks list.  |
| `notes` | array | No | The job's notes list.  |
| `products` | array | No | The job's products list.  |
| `services` | array | No | The job's services list.  |
| `other_charges` | array | No | The job's other charges list.  |
| `labor_charges` | array | No | The job's labor charges list.  |
| `expenses` | array | No | The job's expenses list.  |
| `payments` | array | No | The job's payments list.  |
| `invoices` | array | No | The job's invoices list.  |
| `signatures` | array | No | The job's signatures list.  |
| `printable_work_order` | array | No | The job's printable work order list.  |
| `visits` | array | No | The job's visits list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /job-categories


### GET /job-categories

List all JobCategories matching query criteria, if provided,
otherwise list all JobCategories.


**Traits**: tra.jobCategory-fieldable, tra.jobCategory-sortable, tra.jobCategory-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `name` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `name` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /job-categories/{job-category-id}

Get a JobCategory by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `job-category-id` | integer | Yes | Used to send an identifier of the JobCategory to be used.  |

### GET /job-categories/{job-category-id}

Get a JobCategory by identifier.


**Traits**: tra.jobCategory-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `name` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job category's identifier.  |
| `name` | string | No | The job category's name.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /job-statuses


### GET /job-statuses

List all JobStatuses matching query criteria, if provided,
otherwise list all JobStatuses.


**Traits**: tra.jobStatus-fieldable, tra.jobStatus-sortable, tra.jobStatus-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `code`, `name`, `is_custom`, `category` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `code`, `name`, `is_custom`, `category` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /job-statuses/{job-status-id}

Get a JobStatus by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `job-status-id` | integer | Yes | Used to send an identifier of the JobStatus to be used.  |

### GET /job-statuses/{job-status-id}

Get a JobStatus by identifier.


**Traits**: tra.jobStatus-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `code`, `name`, `is_custom`, `category` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The job statuse's identifier.  |
| `code` | string | No | The job statuse's code.  |
| `name` | string | No | The job statuse's name.  |
| `is_custom` | string | No | The job statuse's is custom flag.  |
| `category` | string | No | The `header` of attached category to the status (Note: `header` - [string] the category's fields concatenated by pattern `{code}`).  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /estimates


### POST /estimates

Create a new Estimate.


**Traits**: tra.estimate-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `description`, `tech_notes`, `payment_status`, `taxes_fees_total`, `total`, `due_total`, `cost_total`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `created_at`, `updated_at`, `customer_id`, `customer_name`, `parent_customer`, `status`, `sub_status`, `contact_first_name`, `contact_last_name`, `street_1`, `street_2`, `city`, `state_prov`, `postal_code`, `location_name`, `is_gated`, `gate_instructions`, `category`, `source`, `payment_type`, `customer_payment_terms`, `project`, `phase`, `po_number`, `contract`, `note_to_customer`, `opportunity_rating`, `opportunity_owner` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `agents`, `custom_fields`, `pictures`, `documents`, `equipment`, `equipment.custom_fields`, `techs_assigned`, `tasks`, `notes`, `products`, `services`, `other_charges`, `payments`, `signatures`, `printable_work_order`, `tags` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Request Body:**
- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | No | Used to send the estimate's description that will be set.  |
| `tech_notes` | string | No | Used to send the estimate's tech notes that will be set.  |
| `duration` | integer | No | Used to send the estimate's duration (in seconds) that will be set.  |
| `time_frame_promised_start` | string | No | Used to send the estimate's time frame promised start that will be set.  |
| `time_frame_promised_end` | string | No | Used to send the estimate's time frame promised end that will be set.  |
| `start_date` | datetime | No | Used to send the estimate's start date that will be set.  |
| `created_at` | datetime | No | Used to send the estimate's created date that will be set.  |
| `customer_name` | string | Yes | Used to send a customer's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the customer's identifier, `header` - [string] the customer's fields concatenated by pattern `{ |
| `status` | string | No | Used to send a status'es `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the status'es identifier, `header` - [string] the status'es fields concatenated by pattern `{nam |
| `contact_first_name` | string | No | Used to send the estimate's contact first name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be atta |
| `contact_last_name` | string | No | Used to send the estimate's contact last name that will be set. If a contact with the passed name and surname already exists, then a new contact will not be created, but the existing one will be attac |
| `street_1` | string | No | Used to send the estimate's location street 1 that will be set.  |
| `street_2` | string | No | Used to send the estimate's location street 2 that will be set.  |
| `city` | string | No | Used to send the estimate's location city that will be set.  |
| `state_prov` | string | No | Used to send the estimate's location state prov that will be set.  |
| `postal_code` | string | No | Used to send the estimate's location postal code that will be set.  |
| `location_name` | string | No | Used to send the estimate's location name that will be set.  |
| `is_gated` | boolean | No | Used to send the estimate's location is gated flag that will be set.  |
| `gate_instructions` | string | No | Used to send the estimate's location gate instructions that will be set.  |
| `category` | string | No | Used to send a category's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the category's identifier, `header` - [string] the category's fields concatenated by pattern `{ |
| `source` | string | No | Used to send a source's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the source's identifier, `header` - [string] the source's fields concatenated by pattern `{short_ |
| `project` | string | No | Used to send a project's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the project's identifier, `header` - [string] the project's fields concatenated by pattern `{nam |
| `phase` | string | No | Used to send a phase's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the phase's identifier, `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | Used to send the estimate's po number that will be set.  |
| `contract` | string | No | Used to send a contract's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the contract's identifier, `header` - [string] the contract's fields concatenated by pattern `{ |
| `note_to_customer` | string | No | Used to send the estimate's note to customer that will be set.  |
| `opportunity_rating` | integer | No | Used to send the estimate's opportunity rating that will be set.  |
| `opportunity_owner` | string | No | Used to send an opportunity owner's `id` or `header` that will be attached to the estimate (Note: `id` - [integer] the opportunity owner's identifier, `header` - [string] the opportunity owner's field |
| `custom_fields` | array | No | Used to send the estimate's custom fields list that will be set.  |
| `equipment` | array | No | Used to send the estimate's equipments list that will be set.  |
| `techs_assigned` | array | No | Used to send the estimate's techs assigned list that will be set.  |
| `tasks` | array | No | Used to send the estimate's tasks list that will be set.  |
| `notes` | array | No | Used to send the estimate's notes list that will be set.  |
| `products` | array | No | Used to send the estimate's products list that will be set.  |
| `services` | array | No | Used to send the estimate's services list that will be set.  |
| `other_charges` | array | No | Used to send the estimate's other charges list that will be set.  |
| `tags` | array | No | Used to send the estimate's tags list that will be set.  |

**Responses:**

#### 201
### 201 Created (Success)
The request has been fulfilled, resulting in the creation of a new resource.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The estimate's identifier.  |
| `number` | string | No | The estimate's number.  |
| `description` | string | No | The estimate's description.  |
| `tech_notes` | string | No | The estimate's tech notes.  |
| `customer_payment_terms` | string | No | The estimate's customer payment terms.  |
| `payment_status` | string | No | The estimate's payment status.  |
| `taxes_fees_total` | number | No | The estimate's taxes and fees total.  |
| `total` | number | No | The estimate's total.  |
| `due_total` | number | No | The estimate's due total.  |
| `cost_total` | number | No | The estimate's cost total.  |
| `duration` | integer | No | The estimate's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The estimate's time frame promised start.  |
| `time_frame_promised_end` | string | No | The estimate's time frame promised end.  |
| `start_date` | datetime | No | The estimate's start date.  |
| `created_at` | datetime | No | The estimate's created date.  |
| `updated_at` | datetime | No | The estimate's updated date.  |
| `customer_id` | integer | No | The `id` of attached customer to the estimate (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the estimate (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the estimate (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the estimate (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the estimate (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The estimate's contact first name.  |
| `contact_last_name` | string | No | The estimate's contact last name.  |
| `street_1` | string | No | The estimate's location street 1.  |
| `street_2` | string | No | The estimate's location street 2.  |
| `city` | string | No | The estimate's location city.  |
| `state_prov` | string | No | The estimate's location state prov.  |
| `postal_code` | string | No | The estimate's location postal code.  |
| `location_name` | string | No | The estimate's location name.  |
| `is_gated` | boolean | No | The estimate's location is gated flag.  |
| `gate_instructions` | string | No | The estimate's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the estimate (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the estimate (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the estimate (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `project` | string | No | The `header` of attached project to the estimate (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the estimate (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The estimate's po number.  |
| `contract` | string | No | The `header` of attached contract to the estimate (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The estimate's note to customer.  |
| `opportunity_rating` | integer | No | The estimate's opportunity rating.  |
| `opportunity_owner` | string | No | The `header` of attached opportunity owner to the estimate (Note: `header` - [string] the opportunity owner's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `agents` | array | No | The estimate's agents list.  |
| `custom_fields` | array | No | The estimate's custom fields list.  |
| `pictures` | array | No | The estimate's pictures list.  |
| `documents` | array | No | The estimate's documents list.  |
| `equipment` | array | No | The estimate's equipments list.  |
| `techs_assigned` | array | No | The estimate's techs assigned list.  |
| `tasks` | array | No | The estimate's tasks list.  |
| `notes` | array | No | The estimate's notes list.  |
| `products` | array | No | The estimate's products list.  |
| `services` | array | No | The estimate's services list.  |
| `other_charges` | array | No | The estimate's other charges list.  |
| `payments` | array | No | The estimate's payments list.  |
| `signatures` | array | No | The estimate's signatures list.  |
| `printable_work_order` | array | No | The estimate's printable work order list.  |
| `tags` | array | No | The estimate's tags list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 422
### 422 Unprocessable Entity (Client Error)
The request was well-formed but was unable to be followed due to semantic errors.

- Type: `array`

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

### GET /estimates

List all Estimates matching query criteria, if provided,
otherwise list all Estimates.


**Traits**: tra.estimate-fieldable, tra.estimate-sortable, tra.estimate-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `description`, `tech_notes`, `payment_status`, `taxes_fees_total`, `total`, `due_total`, `cost_total`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `created_at`, `updated_at`, `customer_id`, `customer_name`, `parent_customer`, `status`, `sub_status`, `contact_first_name`, `contact_last_name`, `street_1`, `street_2`, `city`, `state_prov`, `postal_code`, `location_name`, `is_gated`, `gate_instructions`, `category`, `source`, `payment_type`, `customer_payment_terms`, `project`, `phase`, `po_number`, `contract`, `note_to_customer`, `opportunity_rating`, `opportunity_owner` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `agents`, `custom_fields`, `pictures`, `documents`, `equipment`, `equipment.custom_fields`, `techs_assigned`, `tasks`, `notes`, `products`, `services`, `other_charges`, `payments`, `signatures`, `printable_work_order`, `tags` |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `number`, `po_number`, `description`, `tech_notes`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `created_at`, `updated_at`, `customer_id`, `customer_name`, `status`, `sub_status`, `category`, `source`, `payment_type`, `customer_payment_terms`, `contract`, `opportunity_rating` |
| `filters[status]` | string | No | - | Used to filter results by given statuses (full match). Accepted value is comma-separated string.  |
| `filters[number]` | string | No | - | Used to filter results by given number (partial match).  |
| `filters[po_number]` | string | No | - | Used to filter results by given po number (partial match).  |
| `filters[customer_name]` | string | No | - | Used to filter results by given customer's name (partial match).  |
| `filters[parent_customer_name]` | string | No | - | Used to filter results by given parent customer's name (partial match).  |
| `filters[contact_first_name]` | string | No | - | Used to filter results by given contact's first name (partial match).  |
| `filters[contact_last_name]` | string | No | - | Used to filter results by given contact's last name (partial match).  |
| `filters[address]` | string | No | - | Used to filter results by given address (partial match).  |
| `filters[city]` | string | No | - | Used to filter results by given city (full match).  |
| `filters[zip_code]` | integer | No | - | Used to filter results by given zip code (full match).  |
| `filters[phone]` | string | No | - | Used to filter results by given phone (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (full match).  |
| `filters[category]` | string | No | - | Used to filter results by given categories (full match). Accepted value is comma-separated string.  |
| `filters[source]` | string | No | - | Used to filter results by given sources (full match). Accepted value is comma-separated string.  |
| `filters[start_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of start date (format: `Y-m-d`).  |
| `filters[start_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of start date (format: `Y-m-d`).  |
| `filters[end_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of end date (format: `Y-m-d`).  |
| `filters[end_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of end date (format: `Y-m-d`).  |
| `filters[requested_date][lte]` | string | No | - | Used to filter results by given `less than or equal` of requested date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `filters[requested_date][gte]` | string | No | - | Used to filter results by given `greater than or equal` of requested date (format `RFC 3339`: `Y-m-d\TH:i:sP`).  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /estimates/{estimate-id}

Get a Estimate by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `estimate-id` | integer | Yes | Used to send an identifier of the Estimate to be used.  |

### GET /estimates/{estimate-id}

Get a Estimate by identifier.


**Traits**: tra.estimate-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `description`, `tech_notes`, `payment_status`, `taxes_fees_total`, `total`, `due_total`, `cost_total`, `duration`, `time_frame_promised_start`, `time_frame_promised_end`, `start_date`, `created_at`, `updated_at`, `customer_id`, `customer_name`, `parent_customer`, `status`, `sub_status`, `contact_first_name`, `contact_last_name`, `street_1`, `street_2`, `city`, `state_prov`, `postal_code`, `location_name`, `is_gated`, `gate_instructions`, `category`, `source`, `payment_type`, `customer_payment_terms`, `project`, `phase`, `po_number`, `contract`, `note_to_customer`, `opportunity_rating`, `opportunity_owner` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  Values: `agents`, `custom_fields`, `pictures`, `documents`, `equipment`, `equipment.custom_fields`, `techs_assigned`, `tasks`, `notes`, `products`, `services`, `other_charges`, `payments`, `signatures`, `printable_work_order`, `tags` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The estimate's identifier.  |
| `number` | string | No | The estimate's number.  |
| `description` | string | No | The estimate's description.  |
| `tech_notes` | string | No | The estimate's tech notes.  |
| `customer_payment_terms` | string | No | The estimate's customer payment terms.  |
| `payment_status` | string | No | The estimate's payment status.  |
| `taxes_fees_total` | number | No | The estimate's taxes and fees total.  |
| `total` | number | No | The estimate's total.  |
| `due_total` | number | No | The estimate's due total.  |
| `cost_total` | number | No | The estimate's cost total.  |
| `duration` | integer | No | The estimate's duration (in seconds).  |
| `time_frame_promised_start` | string | No | The estimate's time frame promised start.  |
| `time_frame_promised_end` | string | No | The estimate's time frame promised end.  |
| `start_date` | datetime | No | The estimate's start date.  |
| `created_at` | datetime | No | The estimate's created date.  |
| `updated_at` | datetime | No | The estimate's updated date.  |
| `customer_id` | integer | No | The `id` of attached customer to the estimate (Note: `id` - [integer] the customer's identifier).  |
| `customer_name` | string | No | The `header` of attached customer to the estimate (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `parent_customer` | string | No | The `header` of attached parent customer to the estimate (Note: `header` - [string] the parent customer's fields concatenated by pattern `{customer_name}`).  |
| `status` | string | No | The `header` of attached status to the estimate (Note: `header` - [string] the status'es fields concatenated by pattern `{name}`).  |
| `sub_status` | string | No | The `header` of attached sub status to the estimate (Note: `header` - [string] the sub status's fields concatenated by pattern `{name}`).  |
| `contact_first_name` | string | No | The estimate's contact first name.  |
| `contact_last_name` | string | No | The estimate's contact last name.  |
| `street_1` | string | No | The estimate's location street 1.  |
| `street_2` | string | No | The estimate's location street 2.  |
| `city` | string | No | The estimate's location city.  |
| `state_prov` | string | No | The estimate's location state prov.  |
| `postal_code` | string | No | The estimate's location postal code.  |
| `location_name` | string | No | The estimate's location name.  |
| `is_gated` | boolean | No | The estimate's location is gated flag.  |
| `gate_instructions` | string | No | The estimate's location gate instructions.  |
| `category` | string | No | The `header` of attached category to the estimate (Note: `header` - [string] the category's fields concatenated by pattern `{category}`).  |
| `source` | string | No | The `header` of attached source to the estimate (Note: `header` - [string] the source's fields concatenated by pattern `{short_name}`).  |
| `payment_type` | string | No | The `header` of attached payment type to the estimate (Note: `header` - [string] the payment type's fields concatenated by pattern `{short_name}`).  |
| `project` | string | No | The `header` of attached project to the estimate (Note: `header` - [string] the project's fields concatenated by pattern `{name}`).  |
| `phase` | string | No | The `header` of attached phase to the estimate (Note: `header` - [string] the phase's fields concatenated by pattern `{name}`).  |
| `po_number` | string | No | The estimate's po number.  |
| `contract` | string | No | The `header` of attached contract to the estimate (Note: `header` - [string] the contract's fields concatenated by pattern `{contract_title}`).  |
| `note_to_customer` | string | No | The estimate's note to customer.  |
| `opportunity_rating` | integer | No | The estimate's opportunity rating.  |
| `opportunity_owner` | string | No | The `header` of attached opportunity owner to the estimate (Note: `header` - [string] the opportunity owner's fields concatenated by pattern `{first_name} {last_name}` with space as separator).  |
| `agents` | array | No | The estimate's agents list.  |
| `custom_fields` | array | No | The estimate's custom fields list.  |
| `pictures` | array | No | The estimate's pictures list.  |
| `documents` | array | No | The estimate's documents list.  |
| `equipment` | array | No | The estimate's equipments list.  |
| `techs_assigned` | array | No | The estimate's techs assigned list.  |
| `tasks` | array | No | The estimate's tasks list.  |
| `notes` | array | No | The estimate's notes list.  |
| `products` | array | No | The estimate's products list.  |
| `services` | array | No | The estimate's services list.  |
| `other_charges` | array | No | The estimate's other charges list.  |
| `payments` | array | No | The estimate's payments list.  |
| `signatures` | array | No | The estimate's signatures list.  |
| `printable_work_order` | array | No | The estimate's printable work order list.  |
| `tags` | array | No | The estimate's tags list.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /invoices


### GET /invoices

List all Invoices matching query criteria, if provided,
otherwise list all Invoices.


**Traits**: tra.invoice-fieldable, tra.invoice-sortable, tra.invoice-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `currency`, `po_number`, `terms`, `customer_message`, `notes`, `pay_online_url`, `qbo_invoice_no`, `qbo_sync_token`, `qbo_synced_date`, `qbo_id`, `qbd_id`, `total`, `is_paid`, `date`, `mail_send_date`, `created_at`, `updated_at`, `customer`, `customer_contact`, `payment_terms`, `bill_to_customer_id`, `bill_to_customer_location_id`, `bill_to_customer_contact_id`, `bill_to_email_id`, `bill_to_phone_id` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `number`, `currency`, `po_number`, `terms`, `customer_message`, `notes`, `qbo_invoice_no`, `qbo_sync_token`, `qbo_synced_date`, `qbo_id`, `qbd_id`, `total`, `is_paid`, `date`, `mail_send_date`, `created_at`, `updated_at`, `customer`, `customer_contact`, `payment_terms`, `bill_to_customer_id`, `bill_to_customer_location_id`, `bill_to_customer_contact_id`, `bill_to_email_id`, `bill_to_phone_id` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /invoices/{invoice-id}

Get a Invoice by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `invoice-id` | integer | Yes | Used to send an identifier of the Invoice to be used.  |

### GET /invoices/{invoice-id}

Get a Invoice by identifier.


**Traits**: tra.invoice-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `number`, `currency`, `po_number`, `terms`, `customer_message`, `notes`, `pay_online_url`, `qbo_invoice_no`, `qbo_sync_token`, `qbo_synced_date`, `qbo_id`, `qbd_id`, `total`, `is_paid`, `date`, `mail_send_date`, `created_at`, `updated_at`, `customer`, `customer_contact`, `payment_terms`, `bill_to_customer_id`, `bill_to_customer_location_id`, `bill_to_customer_contact_id`, `bill_to_email_id`, `bill_to_phone_id` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The invoice's identifier.  |
| `number` | integer | No | The invoice's number.  |
| `currency` | string | No | The invoice's currency.  |
| `po_number` | string | No | The invoice's po number.  |
| `terms` | string | No | The invoice's terms.  |
| `customer_message` | string | No | The invoice's customer message.  |
| `notes` | string | No | The invoice's notes.  |
| `pay_online_url` | string | No | The invoice's pay online url.  |
| `qbo_invoice_no` | integer | No | The invoice's qbo invoice no.  |
| `qbo_sync_token` | integer | No | The invoice's qbo sync token.  |
| `qbo_synced_date` | datetime | No | The invoice's qbo synced date.  |
| `qbo_id` | integer | No | The invoice's qbo class id.  |
| `qbd_id` | string | No | The invoice's qbd class id.  |
| `total` | number | No | The invoice's total.  |
| `is_paid` | boolean | No | The invoice's is paid flag.  |
| `date` | datetime | No | The invoice's date.  |
| `mail_send_date` | datetime | No | The invoice's mail send date.  |
| `created_at` | datetime | No | The invoice's created date.  |
| `updated_at` | datetime | No | The invoice's updated date.  |
| `customer` | string | No | The `header` of attached customer to the invoice (Note: `header` - [string] the customer's fields concatenated by pattern `{customer_name}`).  |
| `customer_contact` | string | No | The `header` of attached customer contact to the invoice (Note: `header` - [string] the customer contact's fields concatenated by pattern `{fname} {lname}` with space as separator).  |
| `payment_terms` | string | No | The `header` of attached payment term to the invoice (Note: `header` - [string] the payment term's fields concatenated by pattern `{name}`).  |
| `bill_to_customer_id` | integer | No | The `id` of attached bill to customer to the invoice (Note: `id` - [integer] the bill to customer's identifier).  |
| `bill_to_customer_location_id` | integer | No | The `id` of attached bill to customer location to the invoice (Note: `id` - [integer] the bill to customer location's identifier).  |
| `bill_to_customer_contact_id` | integer | No | The `id` of attached bill to customer contact to the invoice (Note: `id` - [integer] the bill to customer contact's identifier).  |
| `bill_to_email_id` | integer | No | The `id` of attached bill to email to the invoice (Note: `id` - [integer] the bill to email's identifier).  |
| `bill_to_phone_id` | integer | No | The `id` of attached bill to phone to the invoice (Note: `id` - [integer] the bill to phone's identifier).  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /payment-types


### GET /payment-types

List all PaymentTypes matching query criteria, if provided,
otherwise list all PaymentTypes.


**Traits**: tra.paymentType-fieldable, tra.paymentType-sortable, tra.paymentType-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `code`, `short_name`, `type`, `is_custom` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `code`, `short_name`, `type`, `is_custom` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /payment-types/{payment-type-id}

Get a PaymentType by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `payment-type-id` | integer | Yes | Used to send an identifier of the PaymentType to be used.  |

### GET /payment-types/{payment-type-id}

Get a PaymentType by identifier.


**Traits**: tra.paymentType-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `code`, `short_name`, `type`, `is_custom` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The type's identifier.  |
| `code` | string | No | The type's code.  |
| `short_name` | string | No | The type's short name.  |
| `type` | string | No | The type's type.  |
| `is_custom` | boolean | No | The type's is custom flag.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /sources


### GET /sources

List all Sources matching query criteria, if provided,
otherwise list all Sources.


**Traits**: tra.source-fieldable, tra.source-sortable, tra.source-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `short_name`, `long_name` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `short_name`, `long_name` |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /sources/{source-id}

Get a Source by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source-id` | integer | Yes | Used to send an identifier of the Source to be used.  |

### GET /sources/{source-id}

Get a Source by identifier.


**Traits**: tra.source-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `short_name`, `long_name` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The source's identifier.  |
| `short_name` | string | No | The source's short name.  |
| `long_name` | string | No | The source's long name.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /techs


### GET /techs

List all Techs matching query criteria, if provided,
otherwise list all Techs.


**Traits**: tra.tech-fieldable, tra.tech-sortable, tra.tech-filtrable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Used to send a page number to be displayed.  |
| `per-page` | integer | No | 10 | Used to send a number of items displayed per page (min `1`, max `50`).  |
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `first_name`, `last_name`, `nickname_on_workorder`, `nickname_on_dispatch`, `color_code`, `email`, `phone_1`, `phone_2`, `gender`, `department`, `title`, `bio`, `is_phone_1_mobile`, `is_phone_1_visible_to_client`, `is_phone_2_mobile`, `is_phone_2_visible_to_client`, `is_sales_rep`, `is_field_worker`, `created_at`, `updated_at` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `sort` | string | No | id | Used to sort the results by given fields. Use minus `-` before field name to sort DESC. Accepted value is comma-separated string.  Values: `id`, `first_name`, `last_name`, `nickname_on_workorder`, `nickname_on_dispatch`, `color_code`, `email`, `phone_1`, `phone_2`, `gender`, `department`, `title`, `bio`, `is_phone_1_mobile`, `is_phone_1_visible_to_client`, `is_phone_2_mobile`, `is_phone_2_visible_to_client`, `is_sales_rep`, `is_field_worker`, `created_at`, `updated_at` |
| `filters[first_name]` | string | No | - | Used to filter results by given first name (partial match).  |
| `filters[last_name]` | string | No | - | Used to filter results by given last name (partial match).  |
| `filters[email]` | string | No | - | Used to filter results by given email (partial match).  |
| `filters[nickname_on_workorder]` | string | No | - | Used to filter results by given nickname on workorder (partial match).  |
| `filters[nickname_on_dispatch]` | string | No | - | Used to filter results by given nickname on dispatch (partial match).  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Collection envelope.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |
| `_meta` | object | Yes | Meta information.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

## /techs/{tech-id}

Get a Tech by identifier.


**URI Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tech-id` | integer | Yes | Used to send an identifier of the Tech to be used.  |

### GET /techs/{tech-id}

Get a Tech by identifier.


**Traits**: tra.tech-fieldable, tra.formatable

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | string | No | If not passed, will be displayed all available. | Used to send a list of fields to be displayed. Accepted value is comma-separated string.  Values: `id`, `first_name`, `last_name`, `nickname_on_workorder`, `nickname_on_dispatch`, `color_code`, `email`, `phone_1`, `phone_2`, `gender`, `department`, `title`, `bio`, `is_phone_1_mobile`, `is_phone_1_visible_to_client`, `is_phone_2_mobile`, `is_phone_2_visible_to_client`, `is_sales_rep`, `is_field_worker`, `created_at`, `updated_at` |
| `expand` | string | No | If not passed, will be displayed nothing. | Used to send a list of extra-fields to be displayed. Accepted value is comma-separated string.  |
| `format` | string | No | json | Used to send a format of data of the response. Do not use together with the `Accept` header.  Values: `json`, `xml` |
| `access_token` | string | No | - | Used to send a valid OAuth 2 access token. Do not use together with the `Authorization` header.  |

**Responses:**

#### 200
### 200 OK (Success)
Standard response for successful HTTP requests.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | No | The tech's identifier.  |
| `first_name` | string | No | The tech's first name.  |
| `last_name` | string | No | The tech's last name.  |
| `nickname_on_workorder` | string | No | The tech's nickname on workorder.  |
| `nickname_on_dispatch` | string | No | The tech's nickname on dispatch.  |
| `color_code` | string | No | The tech's color code.  |
| `email` | string | No | The tech's email.  |
| `phone_1` | string | No | The tech's phone 1.  |
| `phone_2` | string | No | The tech's phone 2.  |
| `gender` | string | No | The tech's gender.  |
| `department` | string | No | The tech's department.  |
| `title` | string | No | The tech's title.  |
| `bio` | string | No | The tech's bio.  |
| `is_phone_1_mobile` | boolean | No | The tech's is phone 1 mobile flag.  |
| `is_phone_1_visible_to_client` | boolean | No | The tech's is phone 1 visible to client flag.  |
| `is_phone_2_mobile` | boolean | No | The tech's is phone 2 mobile flag.  |
| `is_phone_2_visible_to_client` | boolean | No | The tech's is phone 2 visible to client flag.  |
| `is_sales_rep` | boolean | No | The tech's is sales rep flag.  |
| `is_field_worker` | boolean | No | The tech's is field worker flag.  |
| `created_at` | datetime | No | The tech's created date.  |
| `updated_at` | datetime | No | The tech's updated date.  |
| `_expandable` | array | Yes | The extra-field's list that are not expanded and can be expanded into objects.  |

#### 400
### 400 Bad Request (Client Error)
The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 401
### 401 Unauthorized (Client Error)
Authentication is required and has failed or has not yet been provided.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 403
### 403 Forbidden (Client Error)
Access to the requested resource is forbidden. The server understood the request, but will not fulfill it.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 404
### 404 Not Found (Client Error)
The requested resource could not be found but may be available in the future.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 405
### 405 Method Not Allowed (Client Error)
A request method is not supported for the requested resource. For example, a GET request on a form that requires data to be presented via POST.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 415
### 415 Unsupported Media Type (Client Error)
The request entity has a media type which the server or resource does not support. For example, the client set request data as `application/xml`, but the server requires that request data use a different format.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 429
### 429 Too Many Requests (Client Error)
The user has sent too many requests in a given amount of time.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

#### 500
### 500 Internal Server Error (Server Error)
A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.

- Type: `object`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | integer | No | The error code associated with the error.  |
| `name` | string | No | The error name associated with the error.  |
| `message` | string | No | The error message associated with the error.  |

---
## Known Issues

### Sort parameter required on /jobs (as of 2026-04-09)
The `/jobs` endpoint hangs indefinitely when queried without a `sort` parameter.
Always include `sort=-start_date` (or another valid sort field) in all `/jobs` GET requests.

### Equipment is a nested resource (not top-level)
There is no `GET /equipment` endpoint. Equipment must be fetched via `GET /customers/{customer-id}/equipment`.

