import { ability } from '@saas/auth'

const canInvite = ability.can('invite', 'User')
const canDelete = ability.can('delete', 'User')

console.log(canInvite)
console.log(canDelete)
