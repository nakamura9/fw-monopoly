import json
from db import SessionLocal
from models import BoardCell


def main():

    db = SessionLocal()

    with open("cells.json") as f:
        data = json.load(f)
        direction_map = {
            "top": "N",
            "left": "W",
            "right": "E",
            "bottom": "S"
        }
        for direction in direction_map.keys():
            for cell in data[direction]:
                db.add(BoardCell(
                    direction=direction_map[direction],
                    cell_type=cell.get("type"),
                    color=cell.get("color",""),
                    cell_id=cell.get("id"),
                    icon=cell.get("icon", ""),
                    label=cell.get("label", "")
                ))

        db.commit()


if __name__ == "__main__":
    main()
