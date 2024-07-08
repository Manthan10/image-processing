const ProcessingRequest = require("../../models/processingRequest");
const processImages = require("../../workers/imageProcessingWorker");

const handleWebhook = async (req, res) => {
  const { requestId } = req.body;

  const processingRequest = await ProcessingRequest.findOne({
    where: { requestId },
  });

  if (!processingRequest) {
    return res.status(404).json({ error: "Request not found" });
  }

  await processImages(); // process the images
  res.status(200).json({ message: "Webhook processed successfully" });
};

module.exports = {
  handleWebhook,
};
