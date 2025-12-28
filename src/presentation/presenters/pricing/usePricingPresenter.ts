"use client";

import { useCallback, useEffect, useState } from "react";
import { PricingPresenterFactory, PricingViewModel } from "./PricingPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = PricingPresenterFactory.createClient();

export interface PricingPresenterState {
  viewModel: PricingViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface PricingPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Pricing presenter
 * Provides state management and actions for Pricing page
 */
export function usePricingPresenter(
  initialViewModel?: PricingViewModel
): [PricingPresenterState, PricingPresenterActions] {
  const [viewModel, setViewModel] = useState<PricingViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading pricing data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount if no initial data
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
    },
    {
      loadData,
      setError,
    },
  ];
}
