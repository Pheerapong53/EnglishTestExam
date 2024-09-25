import React from "react";

function ModalEditExamByCerfcodeNew({ params }) {
  //Component Declaration
  const { id, questioncode } = params.row;
  return (
    <div>
      <p>{id}</p>
      <p>{questioncode}</p>
    </div>
  );
}

export default ModalEditExamByCerfcodeNew;
