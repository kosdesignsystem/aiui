import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { Cell } from "../ui/Cell";
import { Icon } from "../ui/Icon";
import { List, ListContainer } from "../ui/List";
import { CallDirection, CallRecord, callGroupOrder, createCallRecords } from "./calls-data";
import "./CallsTemplates.scss";

const LONG_PRESS_DELAY = 420;
const SWIPE_SELECT_THRESHOLD = 24;
const SWIPE_PREVIEW_WIDTH = 34;

type SelectGestureState = {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  offset: number;
  activated: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function directionGlyph(direction: CallDirection) {
  if (direction === "outgoing") {
    return "↗";
  }
  if (direction === "missed") {
    return "✕";
  }
  return "↙";
}

function directionClassName(direction: CallDirection) {
  return `call-direction-badge call-direction-badge--${direction}`;
}

export function MultiplySelectTemplate() {
  const [calls, setCalls] = useState<CallRecord[]>(() => createCallRecords());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [gestureState, setGestureState] = useState<SelectGestureState | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const skipClickIdRef = useRef<string | null>(null);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const groupedCalls = useMemo(
    () =>
      callGroupOrder
        .map((group) => ({
          group,
          items: calls.filter((call) => call.group === group),
        }))
        .filter((entry) => entry.items.length > 0),
    [calls],
  );

  useEffect(() => {
    const node = bodyRef.current;
    if (!node) {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(node.scrollTop > 12);
    };

    handleScroll();
    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current !== null) {
        window.clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  const clearLongPress = () => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const ensureSelection = (id: string, fromGesture = false) => {
    setSelectionMode(true);
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev;
      }
      return [...prev, id];
    });

    if (fromGesture) {
      skipClickIdRef.current = id;
    }
  };

  const handlePointerDown = (id: string, event: PointerEvent<HTMLButtonElement>) => {
    if (selectionMode) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    setGestureState({
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offset: 0,
      activated: false,
    });

    clearLongPress();
    longPressTimerRef.current = window.setTimeout(() => {
      ensureSelection(id, true);
      setGestureState((prev) => {
        if (!prev || prev.id !== id) {
          return prev;
        }

        return {
          ...prev,
          activated: true,
          offset: SWIPE_PREVIEW_WIDTH,
        };
      });
    }, LONG_PRESS_DELAY);
  };

  const handlePointerMove = (id: string, event: PointerEvent<HTMLButtonElement>) => {
    if (!gestureState || gestureState.id !== id || gestureState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - gestureState.startX;
    const deltaY = event.clientY - gestureState.startY;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
      clearLongPress();
      return;
    }

    if (deltaX <= 0) {
      return;
    }

    event.preventDefault();
    const nextOffset = clamp(deltaX, 0, SWIPE_PREVIEW_WIDTH);

    if (!gestureState.activated && nextOffset >= SWIPE_SELECT_THRESHOLD) {
      clearLongPress();
      ensureSelection(id, true);
      setGestureState({
        ...gestureState,
        activated: true,
        offset: SWIPE_PREVIEW_WIDTH,
      });
      return;
    }

    setGestureState({
      ...gestureState,
      offset: gestureState.activated ? SWIPE_PREVIEW_WIDTH : nextOffset,
    });
  };

  const finishGesture = (id: string, event: PointerEvent<HTMLButtonElement>) => {
    if (!gestureState || gestureState.id !== id || gestureState.pointerId !== event.pointerId) {
      return;
    }

    clearLongPress();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setGestureState(null);
  };

  const handleCellClick = (id: string) => {
    if (skipClickIdRef.current === id) {
      skipClickIdRef.current = null;
      return;
    }

    if (!selectionMode) {
      return;
    }

    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }
      return [...prev, id];
    });
  };

  const selectedCount = selectedIds.length;
  const allSelected = calls.length > 0 && selectedCount === calls.length;

  const toggleSelectAll = () => {
    setSelectionMode(true);
    if (allSelected) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(calls.map((call) => call.id));
  };

  const closeSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds([]);
    setGestureState(null);
    skipClickIdRef.current = null;
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    const selectedLookup = new Set(selectedIds);
    setCalls((prev) => prev.filter((call) => !selectedLookup.has(call.id)));
    setSelectedIds([]);
    setSelectionMode(false);
  };

  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.length === 0) {
        return prev;
      }

      const existingIds = new Set(calls.map((call) => call.id));
      const filtered = prev.filter((id) => existingIds.has(id));
      return filtered.length === prev.length ? prev : filtered;
    });
  }, [calls]);

  const rootClassName = [
    "calls-template",
    "calls-template--multi",
    selectionMode ? "is-selection" : "",
    selectionMode && isScrolled ? "is-scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={rootClassName}>
      <div className="calls-template__top">
        <header className="calls-template__header">
          <h1 className="calls-template__title">Вызовы</h1>
        </header>

        {selectionMode ? (
          <div className="calls-selection-bar">
            <span className="calls-selection-bar__label">Выбрано: {selectedCount}</span>
            <div className="calls-selection-bar__actions">
              <button
                type="button"
                className={`calls-selection-toggle${allSelected ? " is-active" : ""}`}
                aria-label={allSelected ? "Снять выбор со всех" : "Выбрать все"}
                onClick={toggleSelectAll}
              >
                ✓
              </button>
              <button
                type="button"
                className="calls-selection-close"
                aria-label="Закрыть режим выбора"
                onClick={closeSelectionMode}
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          <div className="calls-template__filters">
            <button type="button" className="calls-filter-button calls-filter-button--search" aria-label="Поиск">
              ⌕
            </button>
            <button type="button" className="calls-filter-button is-active">
              Все
            </button>
            <button type="button" className="calls-filter-button">
              Пропущенные
            </button>
          </div>
        )}
      </div>

      <div className="calls-template__body" ref={bodyRef}>
        <ListContainer className="calls-template__list">
          {groupedCalls.map((grouped) => (
            <List key={grouped.group} title={grouped.group}>
              {grouped.items.map((call) => {
                const gestureOffset = gestureState?.id === call.id ? gestureState.offset : 0;
                const isSelectPreview = !selectionMode && gestureOffset > 0;
                const isSelected = selectedSet.has(call.id);
                const rowClassName = `calls-row${selectionMode ? " is-select-mode" : ""}`;

                return (
                  <Cell
                    key={call.id}
                    className={rowClassName}
                    title={call.title}
                    subtitle={call.subtitle}
                    selected={isSelected}
                    active={isSelectPreview}
                    offsetX={gestureOffset}
                    dragging={gestureState?.id === call.id}
                    leftActions={<span className="calls-select-preview" aria-hidden="true" />}
                    leading={
                      <span className={directionClassName(call.direction)} aria-hidden="true">
                        <span className="call-direction-badge__glyph">{directionGlyph(call.direction)}</span>
                      </span>
                    }
                    trailing={
                      <button
                        type="button"
                        className="calls-info-button"
                        aria-label={`Подробности: ${call.title}`}
                        onPointerDown={(event) => {
                          event.stopPropagation();
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      />
                    }
                    onClick={() => handleCellClick(call.id)}
                    onPointerDown={(event) => handlePointerDown(call.id, event)}
                    onPointerMove={(event) => handlePointerMove(call.id, event)}
                    onPointerUp={(event) => finishGesture(call.id, event)}
                    onPointerCancel={(event) => finishGesture(call.id, event)}
                  />
                );
              })}
            </List>
          ))}
        </ListContainer>
      </div>

      {selectionMode ? (
        <div className="calls-selection-actions">
          <button
            type="button"
            className="calls-selection-delete"
            disabled={selectedCount === 0}
            onClick={deleteSelected}
          >
            Удалить
          </button>
        </div>
      ) : (
        <footer className="calls-template__footer">
          <div className="calls-primary-nav">
            <button type="button" className="calls-primary-nav__item is-active">
              <Icon name="phone" width={18} height={18} alt="" />
              Вызовы
            </button>
            <button type="button" className="calls-primary-nav__item">
              <Icon name="dialpad" width={18} height={18} alt="" />
              Набор
            </button>
          </div>
        </footer>
      )}
    </section>
  );
}
