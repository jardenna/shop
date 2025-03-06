import { FC } from 'react';
import './_table.scss';

interface TableProps {
  name?: string;
}

const Table: FC<TableProps> = ({ name }) => (
  <table>
    <caption>{name || 'cap'}</caption>
    <thead>
      <tr>
        <th> Title </th>
        <th>Composer </th>
        <th>Lyrics </th>
        <th> Set </th>

        <th>Arranger / Editing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-cell="Title">in and stay a while</td>
        <td data-cell="Composer">Polay, Rhonda</td>
        <td data-cell="Lyrics">Polay, Rhonda</td>
        <td data-cell="Set">AATTB a-cappella</td>
        <td data-cell="Arranger">
          Sarandakos, S. &amp; Legakis, M. / Legakis, M. (Ed.)
        </td>
      </tr>
      <tr>
        <td data-cell="Title">Come in and stay a while</td>
        <td data-cell="Composer">Polay, Rhonda</td>
        <td data-cell="Lyrics">Polay, Rhonda</td>
        <td data-cell="Set">B a-cappella</td>
        <td data-cell="Arranger">
          Sarandakos, S. &amp; Legakis, M. / Legakis, M. (Ed.)
        </td>
      </tr>
      <tr>
        <td data-cell="Title">In memoriam</td>
        <td data-cell="Composer">Coulais, B.</td>
        <td data-cell="Lyrics">Barratier, C.</td>
        <td data-cell="Set">cB, Pno.</td>
        <td data-cell="Arranger">egakis, M.</td>
      </tr>
      <tr>
        <td data-cell="Title">Lover Man</td>
        <td data-cell="Composer">Davies, J. | Ramirez, R. | Sherman, J.</td>
        <td data-cell="Lyrics">Davies, J. | Ramirez, R. | Sherman, J.</td>
        <td data-cell="Set">SATB, Pno.</td>
        <td data-cell="Arranger">akis, M.</td>
      </tr>
      <tr>
        <td data-cell="Title">Lueur d'été</td>
        <td data-cell="Composer">Coulais, B. </td>
        <td data-cell="Lyrics">Barratier, C.</td>
        <td data-cell="Set">SSAATTBB, Pno.</td>
        <td data-cell="Arranger">Legakis, M.</td>
      </tr>
      <tr>
        <td data-cell="Title">Stairway to Paradise</td>
        <td data-cell="Composer">Gershwin, G. | Francis, A. | De Sylva B.G.</td>
        <td data-cell="Lyrics">Gershwin, I.</td>
        <td data-cell="Set">Pno.</td>
        <td data-cell="Arranger">kis, M.</td>
      </tr>
      <tr>
        <td data-cell="Title">Stairway to Paradise</td>
        <td data-cell="Composer">Gershwin, G. | Francis, A. | De Sylva B.G.</td>
        <td data-cell="Lyrics">Gershwin, I.</td>
        <td data-cell="Set">qSATTBB, Pno.</td>
        <td data-cell="Arranger">tegakis, M.</td>
      </tr>
    </tbody>
  </table>
);

export default Table;
