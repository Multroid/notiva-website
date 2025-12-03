/**
 * Minimal stripe reconciliation stub for marketing app
 */

export async function scheduledReconciliation() {
  // Stub implementation for marketing site
  console.log('Stripe reconciliation cron - stub implementation')
  return { processed: 0 }
}

export async function reconcileUser(userId: string) {
  // Stub implementation for marketing site
  console.log('Reconcile user - stub implementation', userId)
  return { success: true }
}

