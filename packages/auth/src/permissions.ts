import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/User'

type Role = 'ADMIN' | 'MEMBER'
type RolePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, RolePermissions> = {
	ADMIN(_, { can }) {
		can('manage', 'all')
	},
	MEMBER(_, { can }) {
		can('invite', 'User')
		can('create', 'Project')
	},
}
