import { useMemo, useState } from "react";
import {
  Box, Button, Chip, Grid, TextField, Tooltip,
  ToggleButton, ToggleButtonGroup, Typography,
} from "@mui/material";

type DaySchedState = { [day: number]: { [slot: string]: number } };

// Khung giờ hành chính VN
type SlotRange = { start: string; end: string };
const BUSINESS_RANGES: SlotRange[] = [
  { start: "08:00", end: "12:00" },
  { start: "13:00", end: "17:30" },
];

const WEEKDAYS = [
  { label: "CN", value: 0 },
  { label: "T2", value: 1 },
  { label: "T3", value: 2 },
  { label: "T4", value: 3 },
  { label: "T5", value: 4 },
  { label: "T6", value: 5 },
  { label: "T7", value: 6 },
];

function toMinutes(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function toHHmm(mins: number) {
  const h = String(Math.floor(mins / 60)).padStart(2, "0");
  const m = String(mins % 60).padStart(2, "0");
  return `${h}:${m}`;
}
function makeRangeLabel(startMins: number, endMins: number) {
  return `${toHHmm(startMins)}-${toHHmm(endMins)}`;
}
// Tạo slots 60’, trượt 30’ (đổi step nếu cần)
function generateHourlySlots(stepMin = 60, displayStepMin = 30) {
  const labels: string[] = [];
  for (const r of BUSINESS_RANGES) {
    let cur = toMinutes(r.start);
    const end = toMinutes(r.end);
    while (cur + stepMin <= end) {
      labels.push(makeRangeLabel(cur, cur + stepMin));
      cur += displayStepMin;
    }
  }
  return Array.from(new Set(labels));
}

export function ScheduleBuilder({
  value,
  onChange,
}: {
  value: DaySchedState;
  onChange: (v: DaySchedState) => void;
}) {
  const [activeDay, setActiveDay] = useState<number>(1); // mặc định Thứ 2
  const slots = useMemo(() => generateHourlySlots(60, 30), []);

  // ensure path exist
  const ensure = (v = value, day = activeDay) => {
    const n: DaySchedState = { ...v };
    if (!n[day]) n[day] = {};
    return n;
  };

  const toggleSlot = (slot: string) => {
    let n = ensure();
    const cur = n[activeDay][slot];
    if (cur) delete n[activeDay][slot];
    else n[activeDay][slot] = 1;
    onChange({ ...n });
  };

  const setQty = (slot: string, qty: number) => {
    let n = ensure();
    if (qty <= 0) delete n[activeDay][slot];
    else n[activeDay][slot] = qty;
    onChange({ ...n });
  };

  const bulkApply = (mode: "morning" | "afternoon" | "allday", qty = 1) => {
    let n = ensure();
    const ranges = {
      morning: BUSINESS_RANGES[0],
      afternoon: BUSINESS_RANGES[1],
      allday: { start: BUSINESS_RANGES[0].start, end: BUSINESS_RANGES[1].end },
    }[mode];

    const picked = slots.filter((s) => {
      const [s1, s2] = s.split("-");
      return toMinutes(s1) >= toMinutes(ranges.start) && toMinutes(s2) <= toMinutes(ranges.end);
    });
    picked.forEach((s) => { n[activeDay][s] = qty; });
    onChange({ ...n });
  };

  const selectedMap = value?.[activeDay] ?? {};

  // --- Clean buttons (day / all) ---
  const selectedCountDay = Object.keys(value?.[activeDay] || {}).length;
  const selectedCountAll = Object.values(value || {}).reduce((sum, m) => sum + Object.keys(m || {}).length, 0);

  const clearSelected = (scope: "day" | "all") => {
    let n: DaySchedState = { ...value };
    if (scope === "day") {
      if (n[activeDay]) n[activeDay] = {};
    } else {
      n = {};
    }
    onChange(n);
  };

  return (
    <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 2, p: 2 }}>
      {/* Weekday toggle */}
      <ToggleButtonGroup
        value={activeDay}
        exclusive
        onChange={(_, d) => { if (d !== null) setActiveDay(d); }}
        sx={{ mb: 2, flexWrap: "wrap" }}
      >
        {WEEKDAYS.map((d) => (
          <ToggleButton color="primary" key={d.value} value={d.value} size="small">
            {d.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Bulk actions + Clean */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2, flexWrap: "wrap" }}>
        <Typography variant="body2">Áp dụng nhanh:</Typography>
        <Button size="small" variant="outlined" onClick={() => bulkApply("morning", 1)}>Sáng (x1)</Button>
        <Button size="small" variant="outlined" onClick={() => bulkApply("afternoon", 1)}>Chiều (x1)</Button>
        <Button size="small" variant="outlined" onClick={() => bulkApply("allday", 1)}>Cả ngày (x1)</Button>

        {/* Clean buttons */}
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, ml: "auto", flexWrap: "wrap" }}>
          <Tooltip title={`Xoá tất cả slot của ngày đang chọn (${selectedCountDay})`}>
            <span>
              <Button
                size="small"
                variant="outlined"
                color="error"
                disabled={selectedCountDay === 0}
                onClick={() => clearSelected("day")}
              >
                Xoá ngày ({selectedCountDay})
              </Button>
            </span>
          </Tooltip>
          <Tooltip title={`Xoá tất cả mọi lựa chọn (${selectedCountAll})`}>
            <span>
              <Button
                size="small"
                variant="contained"
                color="error"
                disabled={selectedCountAll === 0}
                onClick={() => clearSelected("all")}
              >
                Xoá tất cả ({selectedCountAll})
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Slot grid */}
      <Grid container spacing={1}>
        {slots.map((slot) => {
          const active = !!selectedMap[slot];
          const qty = selectedMap[slot] ?? 0;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={slot}>
              <Box
                sx={{
                  p: 1, borderRadius: 1, border: "1px solid",
                  borderColor: active ? "primary.main" : "#E5E7EB",
                  bgcolor: active ? "primary.50" : "background.paper",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 1,
                }}
              >
                <Button size="small" variant={active ? "contained" : "text"} onClick={() => toggleSlot(slot)}>
                  {slot}
                </Button>
                {active ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Tooltip title="Giảm số lượng">
                      <button
                        type="button"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => setQty(slot, qty - 1)}
                      >-</button>
                    </Tooltip>
                    <TextField
                      size="small" type="number" value={qty}
                      onChange={(e) => setQty(slot, Math.max(1, parseInt(e.target.value || "1")))}
                      inputProps={{ min: 1 }} sx={{ width: 50 }}
                    />
                    <Tooltip title="Tăng số lượng">
                      <button
                        type="button"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => setQty(slot, qty + 1)}
                      >+</button>
                    </Tooltip>
                  </Box>
                ) : (
                  <Box sx={{ width: 70, textAlign: "right", color: "text.secondary" }}>
                    &nbsp;
                  </Box>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Selected preview */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Đã chọn (ngày {WEEKDAYS.find((x) => x.value === activeDay)?.label}) •
          {" "}Ngày: {selectedCountDay} • Tổng: {selectedCountAll}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {Object.entries(selectedMap).map(([time, q]) => (
            <Chip key={time} color="primary" label={`${time} × ${q}`} onDelete={() => setQty(time, 0)} sx={{ mt: 1.5 }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
