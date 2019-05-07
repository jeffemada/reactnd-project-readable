import React from 'react';
import Post from './Post';

export default function DashbordList(props) {
  const { postIds } = props;

  return (
    <section className="dashbord-list">
      <ul>
        {postIds.map((id) => (
          <li key={id}>
            <Post id={id} />
          </li>
        ))}
      </ul>
    </section>
  );
}
