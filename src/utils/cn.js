import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine clsx and tw-merge
 * @param {string[]} classes - List of class names to merge
 * @returns {string} - The merged class string
 */

export const cn = (...classes) => {
  return twMerge(clsx(...classes));
};
