import {
	AbilityBuilder,
	CreateAbility,
	createMongoAbility,
	MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/User'
import { permissions } from './permissions'
import { billingSubject } from './subjects/billing'
import { organizationSubject } from './subjects/organization'
import { projectSubject } from './subjects/project'
import { userSubject } from './subjects/user'

const appAbilitiesSchema = z.union([
	projectSubject,
	userSubject,
	organizationSubject,
	billingSubject,
	projectSubject,

	z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User): AppAbility {
	const builder = new AbilityBuilder(createAppAbility)

	if (typeof permissions[user.role] !== 'function') {
		throw new Error(`Permissions for role ${user.role} were not found`)
	}

	permissions[user.role](user, builder)

	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		},
	})

	return ability
}
