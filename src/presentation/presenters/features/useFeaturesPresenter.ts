"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FeaturesPresenterFactory,
  FeaturesViewModel,
} from "./FeaturesPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = FeaturesPresenterFactory.createClient();

export interface FeaturesPresenterState {
  viewModel: FeaturesViewModel | null;
  loading: boolean;
  error: string | null;
}

export interface FeaturesPresenterActions {
  loadData: () => Promise<void>;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Features presenter
 * Provides state management and actions for Features page
 */
export function useFeaturesPresenter(
  initialViewModel?: FeaturesViewModel
): [FeaturesPresenterState, FeaturesPresenterActions] {
  const [viewModel, setViewModel] = useState<FeaturesViewModel | null>(
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
      console.error("Error loading features data:", err);
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
