"use server";

import { supabase } from "@/lib/supabase";
import { OffererProps, OfferProps, OfferWithOffererProps } from "@/types";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const getOffers = async (
  projectId: string
): Promise<{
  data: OfferWithOffererProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("offers")
      .select(
        `
      *,
      offerer:offerer_id (
        id,
        name
      )
    `
      )
      .eq("project_id", projectId);

    if (error) {
      // If there's an error from Supabase, handle it explicitly
      return {
        data: null,
        error,
        message: "Failed to fetch offers: " + error.message,
      };
    }

    return {
      data,
      error: null,
      message: "Successfully fetched offers",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "An unexpected error occurred while fetching offers",
    };
  }
};

export const getOfferers = async (): Promise<{
  data: OffererProps[] | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase.from("offerers").select();

    if (error) {
      // If there's an error from Supabase, handle it explicitly
      return {
        data: null,
        error,
        message: "Failed to fetch offerers: " + error.message,
      };
    }

    return {
      data: data || null,
      error: null,
      message: "Successfully fetched offerers",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "An unexpected error occurred while fetching offerers",
    };
  }
};

export const addOffer = async (
  values: Omit<OfferProps, "id" | "created_at">
): Promise<{
  data: OfferProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("offers")
      .insert({ ...values })
      .select()
      .single();

    if (error) {
      return {
        data: null,
        error,
        message: "Failed to create offer: " + error.message,
      };
    }

    revalidatePath(`/`, "layout");

    return {
      data,
      error: null,
      message: "Successfully created offer",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "An unexpected error occurred while creating a offer",
    };
  }
};

export const addOfferer = async (
  values: Omit<OffererProps, "id" | "created_at">
): Promise<{
  data: OffererProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("offerers")
      .insert({ ...values })
      .select()
      .single();

    if (!data) {
      return {
        data: null,
        error,
        message: "Failed to create offerer",
      };
    }

    revalidatePath(`/`, "layout");

    return {
      data,
      error: null,
      message: "Successfully created offerer",
    };
  } catch (error) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "An unexpected error occurred while creating a offerer",
    };
  }
};

export const getOffererWithOfferId = async (
  offerId: string
): Promise<{
  data: OfferWithOffererProps | null;
  error: PostgrestError | null;
  message: string;
}> => {
  try {
    const { data, error } = await supabase
      .from("offers")
      .select(
        `
      *,
      offerer:offerer_id (
        id,
        name
      )
    `
      ) // Fetch all fields from "offers" and related data from "offerers"
      .eq("id", offerId) // Filter by the offerId
      .single();

    if (error) {
      // If there's an error from Supabase, handle it explicitly
      return {
        data: null,
        error,
        message: "Failed to fetch offerer: " + error.message,
      };
    }

    return {
      data: data || null,
      error: null,
      message: "Successfully fetched offerer",
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as PostgrestError,
      message: "An unexpected error occurred while fetching offerer",
    };
  }
};
