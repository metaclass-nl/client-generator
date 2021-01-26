import React from 'react';
import {Link} from "react-router-dom";

export default function EntityLinks(props) {
    const {type, items, up} = props;
    if (items === undefined || items === null) {
      return null;
    }
    if (Array.isArray(items)) {
        return items.map((item, i) => (
            <div key={i}><EntityLinks type={type} items={item} up={up} /></div>
        ));
    }
    const upTo = up ? '../' : '';
    return (
        <Link to={`${upTo}../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
};
