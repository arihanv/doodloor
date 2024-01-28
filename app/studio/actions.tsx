"use server"

import { revalidatePath } from "next/cache"

export async function revalidateGallery() {
  revalidatePath("/gallery")
}
