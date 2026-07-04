/**
 * import React, { SyntheticEvent, useRef, useEffect } from "react";
import styles from "./vertical-scroll.module.css";

export const VerticalScroll: React.FC<{
  scroll: number;
  ganttHeight: number;
  ganttFullHeight: number;
  headerHeight: number;
  rtl: boolean;
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({
  scroll,
  ganttHeight,
  ganttFullHeight,
  headerHeight,
  rtl,
  onScroll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scroll;
    }
  }, [scroll]);

  return (
    <div
      style={{
        height: ganttHeight,
        marginTop: headerHeight,
        marginLeft: rtl ? "" : "-1rem",
      }}
      className={styles.scroll}
      onScroll={onScroll}
      ref={scrollRef}
    >
      <div style={{ height: ganttFullHeight, width: 1 }} />
    </div>
  );
};
*/

import React, { SyntheticEvent, useRef, useEffect } from "react";
import styles from "./vertical-scroll.module.css";

interface VerticalScrollProps {
  scroll: number;
  ganttHeight: number;
  ganttFullHeight: number;
  headerHeight: number;
  rtl: boolean;
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}

export const VerticalScroll: React.FC<VerticalScrollProps> = ({
  scroll,
  ganttHeight,
  ganttFullHeight,
  headerHeight,
  rtl,
  onScroll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sincroniza el scroll del padre solo si es diferente para evitar bucles de renderizado
  useEffect(() => {
    const element = scrollRef.current;
    if (element && element.scrollTop !== scroll) {
      element.scrollTop = scroll;
    }
  }, [scroll]);

  const containerStyle: React.CSSProperties = {
    height: ganttHeight,
    marginTop: headerHeight,
    marginLeft: rtl ? undefined : "-1rem",
  };

  const innerSpacerStyle: React.CSSProperties = {
    height: ganttFullHeight,
    width: 1,
  };

  return (
    <div
      style={containerStyle}
      className={styles.scroll}
      onScroll={onScroll}
      ref={scrollRef}
    >
      <div style={innerSpacerStyle} />
    </div>
  );
};
