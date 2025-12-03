/**
 * Stub Prisma Client - Marketing app doesn't use database
 * 
 * This is a stub implementation that doesn't connect to any database.
 * All database operations will return empty results or throw errors.
 */

// Create a stub Prisma client that doesn't actually connect
// No Prisma imports needed - this is a pure stub
const createStubPrisma = () => {
	const stub = {} as any;
	
	// Create stub methods that return empty results
	const createStubModel = (modelName: string) => ({
		findUnique: async () => null,
		findMany: async () => [],
		findFirst: async () => null,
		create: async () => ({ id: 'stub-id' }),
		update: async () => ({ id: 'stub-id' }),
		delete: async () => ({ id: 'stub-id' }),
		deleteMany: async () => ({ count: 0 }),
		updateMany: async () => ({ count: 0 }),
		count: async () => 0,
		groupBy: async () => [],
		aggregate: async () => ({ _count: 0 }),
	});
	
	// Add common models as stubs
	stub.user = createStubModel('user');
	stub.session = createStubModel('session');
	stub.workspace = createStubModel('workspace');
	stub.organization = createStubModel('organization');
	stub.tier = createStubModel('tier');
	stub.passwordResetToken = createStubModel('passwordResetToken');
	stub.emailVerificationToken = createStubModel('emailVerificationToken');
	stub.googleWebhook = createStubModel('googleWebhook');
	stub.integration = createStubModel('integration');
	stub.calendarSyncLog = createStubModel('calendarSyncLog');
	stub.expense = createStubModel('expense');
	stub.document = createStubModel('document');
	stub.notification = createStubModel('notification');
	
	// Stub transaction method
	stub.$transaction = async (callback: any) => {
		if (typeof callback === 'function') {
			return await callback(stub);
		}
		return [];
	};
	
	return stub;
};

export const prisma = createStubPrisma();
export default prisma;

