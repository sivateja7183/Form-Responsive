export const performAssistApply = async (browser, { jobUrl, answers = {} }) => {
  await browser.url(jobUrl);
  // Real implementation should map fields by semantic labels.
  // Semi-auto mode: pause before final submit for user review.
  return {
    filledFields: Object.keys(answers),
    pausedBeforeSubmit: true,
  };
};
