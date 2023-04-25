import React from 'react';
import { Profile } from './data-table-item';
import '@/assets/css/components/data-table.css';
import Button from '../ui/button';
import { Link } from 'react-router-dom';

const DataTable: React.FC = () => {
  return (
    <div className="row layout-spacing">
      <div className="col-lg-12">
        <div className="statbox widget box box-shadow">
          <div className="widget-content-two widget-content-area rounded">
            <table id="style-2" className="table style-2 dt-table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center dt-no-sorting">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <Profile />
                  </td>
                  <td>johndoe@yahoo.com</td>
                  <td>
                    <span className="shadow-none badge badge-secondary">
                      STUDENT
                    </span>
                  </td>
                  <td className="text-center">
                    <Link to={`/profile/userID`}>
                      <Button color="primary" className="btn-sm">
                        View
                      </Button>
                    </Link>
                    <Button color="danger" className="btn-sm ms-2">
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
