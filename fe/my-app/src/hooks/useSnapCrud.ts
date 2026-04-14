'use client';

import { createCrudStore } from './useCrud';

import { snapService } from '@/services/apis/snap.service';

export const useSnapCrud = createCrudStore(snapService);
