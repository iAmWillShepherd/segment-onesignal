import SegmentAnalytics from "analytics-node";
import { SegmentWriteKey } from "./constants";

const analytics = new SegmentAnalytics(SegmentWriteKey);

export default analytics;
