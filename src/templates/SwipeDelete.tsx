import { PointerEvent, useMemo, useState } from "react";
import { Cell } from "../ui/Cell";
import { Icon } from "../ui/Icon";
import { List, ListContainer } from "../ui/List";
import { CallDirection, CallRecord, callGroupOrder, createCallRecords } from "./calls-data";
import "./CallsTemplates.scss";

const SWIPE_ACTION_WIDTH = 64;
const SWIPE_OPEN_THRESHOLD = SWIPE_ACTION_WIDTH * 0.45;

type DragState = {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  startOffset: number;
  offset: number;
  isSwiping: boolean;
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

export function SwipeDeleteTemplate() {
  const [calls, setCalls] = useState<CallRecord[]>(() => createCallRecords());
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);

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

  const callToDelete = confirmId ? calls.find((call) => call.id === confirmId) ?? null : null;

  const getOffsetById = (id: string) => {
    if (dragState?.id === id) {
      return dragState.offset;
    }
    return openId === id ? -SWIPE_ACTION_WIDTH : 0;
  };

  const handlePointerDown = (id: string, event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const startOffset = openId === id ? -SWIPE_ACTION_WIDTH : 0;

    setDragState({
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startOffset,
      offset: startOffset,
      isSwiping: false,
    });
  };

  const handlePointerMove = (id: string, event: PointerEvent<HTMLButtonElement>) => {
    if (!dragState || dragState.id !== id || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (!dragState.isSwiping) {
      if (Math.abs(deltaX) < 6) {
        return;
      }

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
    }

    event.preventDefault();
    const offset = clamp(dragState.startOffset + deltaX, -SWIPE_ACTION_WIDTH, 0);

    setDragState({
      ...dragState,
      offset,
      isSwiping: true,
    });
  };

  const finishPointer = (id: string, event: PointerEvent<HTMLButtonElement>) => {
    if (!dragState || dragState.id !== id || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const shouldOpen = dragState.offset <= -SWIPE_OPEN_THRESHOLD;
    setOpenId(shouldOpen ? id : null);
    setDragState(null);
  };

  const handleCellClick = (id: string) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }

    if (openId) {
      setOpenId(null);
    }
  };

  const requestDelete = (id: string) => {
    setConfirmId(id);
    setOpenId(null);
    setDragState(null);
  };

  const confirmDelete = () => {
    if (!confirmId) {
      return;
    }

    setCalls((prev) => prev.filter((call) => call.id !== confirmId));
    setConfirmId(null);
  };

  return (
    <section className="calls-template calls-template--swipe">
      <div className="calls-template__top">
        <header className="calls-template__header">
          <h1 className="calls-template__title">Вызовы</h1>
        </header>

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
      </div>

      <div className="calls-template__body">
        <div className="calls-template__list">
          <ListContainer>
            {groupedCalls.map((grouped) => (
              <List key={grouped.group} title={grouped.group}>
                {grouped.items.map((call) => (
                  <Cell
                    key={call.id}
                    className="calls-row"
                    title={call.title}
                    subtitle={call.subtitle}
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
                    offsetX={getOffsetById(call.id)}
                    dragging={dragState?.id === call.id}
                    rightActions={
                      <button
                        type="button"
                        className="calls-delete-reveal"
                        aria-label={`Удалить ${call.title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          requestDelete(call.id);
                        }}
                      >
                        <Icon name="delete" width={20} height={20} alt="" />
                      </button>
                    }
                    onPointerDown={(event) => handlePointerDown(call.id, event)}
                    onPointerMove={(event) => handlePointerMove(call.id, event)}
                    onPointerUp={(event) => finishPointer(call.id, event)}
                    onPointerCancel={(event) => finishPointer(call.id, event)}
                    onClick={() => handleCellClick(call.id)}
                  />
                ))}
              </List>
            ))}
          </ListContainer>
        </div>
      </div>

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

      {callToDelete ? (
        <div className="calls-confirmation" role="dialog" aria-modal="true" aria-label="Подтверждение удаления">
          <button
            type="button"
            className="calls-confirmation__scrim"
            onClick={() => setConfirmId(null)}
            aria-label="Закрыть подтверждение удаления"
          />
          <div className="calls-confirmation__sheet">
            <p className="calls-confirmation__title">Удалить контакт?</p>
            <p className="calls-confirmation__hint">Контакт будет удален без возможности восстановления</p>
            <button type="button" className="calls-confirmation__button calls-confirmation__button--danger" onClick={confirmDelete}>
              Удалить
            </button>
            <button
              type="button"
              className="calls-confirmation__button calls-confirmation__button--neutral"
              onClick={() => setConfirmId(null)}
            >
              Отмена
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
