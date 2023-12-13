/**
 *
 * @param value
 * @example
 * toUpperCase("mock message") => "MOCK_MESSAGE"
 */
export const toUpperCase = (value: string) => {
  const cleaned = value.replaceAll(" ", "_").toLocaleUpperCase();

  return cleaned;
};
