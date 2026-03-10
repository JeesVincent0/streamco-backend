import { UserRole, UserStatus } from '@/modules/user/domain';
import { GetAllUsersInput } from '../inputs';

export function normalizeGetUsersQuery(
  input: GetAllUsersInput,
): GetAllUsersInput {
  let { page, limit, search, role, status, isVerified, sortBy, order } = input;

  role =
    role === UserRole.USER ||
    role === UserRole.ADVERTISER ||
    role === UserRole.ADMIN
      ? role
      : undefined;

  status =
    status === UserStatus.ACTIVE ||
    status === UserStatus.SUSPENDED ||
    status === UserStatus.DELETED
      ? status
      : undefined;

  search = search === '' ? undefined : search;

  if (isVerified === 'true' || isVerified === true) {
    isVerified = true;
  } else if (isVerified === 'false' || isVerified === false) {
    isVerified = false;
  } else {
    isVerified = undefined;
  }

  if (typeof limit !== 'number' || limit <= 0 || limit > 20) {
    limit = 10;
  }

  if (page <= 0) {
    page = 1;
  }

  if (
    sortBy !== 'createdAt' &&
    sortBy !== 'displayName' &&
    sortBy !== 'email'
  ) {
    sortBy = 'createdAt';
  }

  if (order !== 'asc' && order !== 'desc') {
    order = 'desc';
  }

  return {
    page,
    limit,
    search,
    role,
    status,
    isVerified,
    sortBy,
    order,
  };
}
