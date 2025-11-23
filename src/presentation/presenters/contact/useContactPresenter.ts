"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ContactFormData,
  ContactPresenterFactory,
  ContactViewModel,
} from "./ContactPresenter";

// Initialize presenter instance once (singleton pattern)
const presenter = ContactPresenterFactory.createClient();

export interface ContactPresenterState {
  viewModel: ContactViewModel | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitSuccess: boolean;
}

export interface ContactPresenterActions {
  loadData: () => Promise<void>;
  submitContactForm: (data: ContactFormData) => Promise<void>;
  setError: (error: string | null) => void;
  resetSubmitStatus: () => void;
}

/**
 * Custom hook for Contact presenter
 * Provides state management and actions for Contact page
 */
export function useContactPresenter(
  initialViewModel?: ContactViewModel
): [ContactPresenterState, ContactPresenterActions] {
  const [viewModel, setViewModel] = useState<ContactViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      console.error("Error loading contact data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Submit contact form
   */
  const submitContactForm = useCallback(async (data: ContactFormData) => {
    setSubmitting(true);
    setError(null);
    setSubmitSuccess(false);

    try {
      await presenter.submitContactForm(data);
      setSubmitSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  /**
   * Reset submit status
   */
  const resetSubmitStatus = useCallback(() => {
    setSubmitSuccess(false);
    setError(null);
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
      submitting,
      submitSuccess,
    },
    {
      loadData,
      submitContactForm,
      setError,
      resetSubmitStatus,
    },
  ];
}
