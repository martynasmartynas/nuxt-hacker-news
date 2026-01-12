/**
 * Formats a date string into a more readable format.
 * @param {number} timeunix - The date string to format, represented as a Unix timestamp in seconds.
 * @returns {string} - The formatted date string or a fallback message -> 'no date available''
 */
export default function formatDate(timeunix: number): string {
  const date = new Date(timeunix * 1000) // Convert from seconds to milliseconds
  return !isNaN(date.getTime())
    ? Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    : 'no date available'
}
