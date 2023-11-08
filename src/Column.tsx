import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import Card, { CardType } from "./Card";

import RGL, { WidthProvider } from "react-grid-layout";
export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
  style?: object;
};
const ReactGridLayout = WidthProvider(RGL);
const Column: FC<ColumnType> = ({ id, title, cards, style }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    // ソートを行うためのContextです。
    // strategyは4つほど存在しますが、今回は縦・横移動可能なリストを作るためrectSortingStrategyを採用
    <>
      {id !== "Dashboard" ? (
        <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
          <div
            ref={setNodeRef}
            style={{
              background: "rgba(245,247,249,1.00)",
              marginRight: "10px",
              display: "flex",
              flexDirection: "column",
              ...style
            }}
          >
            <p
              style={{
                padding: "5px 20px",
                textAlign: "left",
                fontWeight: "500",
                color: "#575757"
              }}
            >
              {title}
            </p>
            <div style={{ display: "flex" }}>
              {cards.map((card) => (
                <Card key={card.id} id={card.id} title={card.title}></Card>
              ))}
            </div>
          </div>
        </SortableContext>
      ) : (
        <ReactGridLayout>
          <div
            style={{
              background: "rgba(245,247,249,1.00)",
              marginRight: "10px",
              display: "flex",
              flexDirection: "column",
              ...style
            }}
          >
            <p
              style={{
                padding: "5px 20px",
                textAlign: "left",
                fontWeight: "500",
                color: "#575757"
              }}
            >
              {title}
            </p>
            <div style={{ display: "flex" }}>
              {cards.map((card) => (
                <Card key={card.id} id={card.id} title={card.title}></Card>
              ))}
            </div>
          </div>
        </ReactGridLayout>
      )}
    </>
  );
};

export default Column;
