// TODO	se debe colocar el esquema de usuario
const userSchema = {
	type: 'object',
	properties: {
		data: {
			type: 'object',
			properties: {
				company_identification: {
					type: 'object',
					properties: {
						number: {
							type: 'string',
							pattern: '^([0-9])*$',
							minLength: 1
						},
						validator: {
							type: 'string',
							minLength: 1,
							maxLength: 1
						}
					},
					required: ['number', 'validator']
				},
				company_data: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							minLength: 1
						},
						email: {
							type: 'string',
							minLength: 1
						},
						phone: {
							type: 'integer',
							minimum: 8
						}
					},
					required: ['name', 'email', 'phone']
				},
				company_address: {
					type: 'object',
					properties: {
						city: {
							type: 'string',
							minLength: 1
						},
						street: {
							type: 'string',
							minLength: 1
						}
					},
					required: ['city', 'street']
				}
			},
			required: ['company_identification', 'company_data', 'company_address']
		}
	},
	required: ['data']
}

module.exports = userSchema
