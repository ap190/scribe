import { OrderedSet, is } from "immutable";

export const EMPTY_SET = new OrderedSet();

function getStyleRanges(text, charMetaList) {
  let charStyle = EMPTY_SET;
  let prevCharStyle = EMPTY_SET;
  let ranges = [];
  let rangeStart = 0;
  for (let i = 0, len = text.length; i < len; i++) {
    prevCharStyle = charStyle;
    let meta = charMetaList.get(i);
    charStyle = meta ? meta.getStyle() : EMPTY_SET;
    if (i > 0 && !is(charStyle, prevCharStyle)) {
      ranges.push([text.slice(rangeStart, i), prevCharStyle]);
      rangeStart = i;
    }
  }
  ranges.push([text.slice(rangeStart), charStyle]);
  return ranges;
}

export default function getEntityRanges(text, charMetaList) {
  let charEntity = null;
  let prevCharEntity = null;
  let ranges = [];
  let rangeStart = 0;
  for (let i = 0, len = text.length; i < len; i++) {
    prevCharEntity = charEntity;
    let meta = charMetaList.get(i);
    charEntity = meta ? meta.getEntity() : null;
    if (i > 0 && charEntity !== prevCharEntity) {
      ranges.push([
        prevCharEntity,
        getStyleRanges(
          text.slice(rangeStart, i),
          charMetaList.slice(rangeStart, i)
        )
      ]);
      rangeStart = i;
    }
  }
  ranges.push([
    charEntity,
    getStyleRanges(text.slice(rangeStart), charMetaList.slice(rangeStart))
  ]);
  return ranges;
}
