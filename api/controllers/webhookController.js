const ProcessingRequest = require("../../models/processingRequest");

const handleWebhook = async (req, res) => {
  const { requestId, status } = req.body;

  const processingRequest = await ProcessingRequest.findOne({
    where: { requestId },
  });

  if (!processingRequest) {
    return res.status(404).json({ error: "Request not found" });
  }

  processingRequest.status = status;
  await processingRequest.save();

  res.status(200).json({ message: "Webhook processed successfully" });
};

module.exports = {
  handleWebhook,
};
