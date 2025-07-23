import { revalidateAction } from 'lib/shopify/server-actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidateAction(req);
}
