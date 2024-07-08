const ProcessingRequest = require("../../models/processingRequest");

const getStatus = async (req, res) => {
  const { requestId } = req.params;

  const processingRequest = await ProcessingRequest.findOne({
    where: { requestId },
  });

  if (!processingRequest) {
    return res.status(404).json({ error: "Request not found" });
  }

  res.status(200).json({ status: processingRequest.status });
};

module.exports = {
  getStatus,
};
