exports.notFoundItem = (id, res, mas) => {
  const result = res.status(404).json({
        status: false,
        message: `No ${mas} For This id: ${id}`,
  });
  return result
    }

