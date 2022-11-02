import { Table } from "@mantine/core";
import * as React from "react";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  render() {
    const elements = [
      { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
      { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
      { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
      { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
      { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
    ];

    let rows = elements.map((element) => (
      <tr key={element.name}>
        <td>{element.position}</td>
        <td>{element.name}</td>
        <td>{element.symbol}</td>
        <td>{element.mass}</td>
      </tr>
    ));

    return (
      <div className="relativeCSS">
        <style type="text/css" media="print">
          {"\
				@page { size: landscape; }\
			"}
        </style>
        <Table>
          <thead>
            <tr>
              <th>Element position</th>
              <th>Element name</th>
              <th>Symbol</th>
              <th>Atomic mass</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  }
}
export const BillingToPrint = React.forwardRef((props, ref) => {
  return <ComponentToPrint ref={ref} />;
});
