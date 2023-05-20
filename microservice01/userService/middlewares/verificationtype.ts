import { AuthRequest } from "../utils/interfaces/AuthRequest";
import { Response, NextFunction } from "express";
const typeVerification = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const validTypes: string[] = [
    "line",
    "network",
    "pollar",
    "dependency_wheel",
    "line_anotation",
    "collumn",
  ];
  const type = req.params.type;
  if (validTypes.includes(type)) {
    next();
  } else {
    res.status(400).json({
      err: "Not valid  type of chart csv not suported by our services",
    });
  }
};

export { typeVerification };
