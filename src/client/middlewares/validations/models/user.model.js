// TODO	se debe colocar el esquema de usuario
const userSchema = {
	type: 'object',
	properties: {
		data: {
			type: 'object',
			properties: {
				user_identification: {
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
				user_address: {
					type: 'object',
					properties: {
						street: {
							type: 'string',
							minLength: 1
						}
					},
					required: ['street']
				},
				user_contact: {
					type: 'object',
					properties: {
						email: {
							type: 'string',
							minLength: 1
						},
						phone: {
							type: 'integer',
							minimum: 8
						}
					},
					required: ['email', 'phone']
				},
				user_info: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							minLength: 1
						},
						paternal: {
							type: 'string',
							minLength: 1
						},
						maternal: {
							type: 'string',
							minLength: 1
						},
						birthdate: {
							type: 'string',
							minLength: 1
						}
					},
					required: ['name', 'paternal', 'maternal', 'birthdate']
				},
				user_credentials: {
					type: 'object',
					properties: {
						password: {
							type: 'string',
							minLength: 1
						},
						role: {
							type: 'object',
							properties: {
								code: {
									type: 'integer',
									minimum: 1
								}
							},
							required: ['code']
						}
					},
					required: ['password', 'role']
				},
				user_profesion: {
					type: 'object',
					properties: {
						company: {
							type: 'object',
							properties: {
								code: {
									type: 'integer',
									minimum: 1
								}
							},
							required: ['code']
						},
						job: {
							type: 'object',
							properties: {
								code: {
									type: 'integer',
									minimum: 1
								}
							},
							required: ['code']
						}
					},
					required: ['company', 'job']
				}
			},
			required: [
				'user_identification',
				'user_address',
				'user_contact',
				'user_info',
				'user_credentials',
				'user_profesion'
			]
		}
	},
	required: ['data']
};

module.exports = userSchema;
