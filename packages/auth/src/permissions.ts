import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/User'
import { Role } from './roles'

type RolePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, RolePermissions> = {
	ADMIN(_, { can }) {
		can('manage', 'all')
	},
	MEMBER(user, { can }) {
		// can('invite', 'User')
		can(['create', 'get'], 'Project')
		can(['update', 'delete'], 'Project', {
			ownerId: { $eq: user.id },
		})
	},
	BILLING(_, { can }) {
		can('create', 'Project')
	},
}
