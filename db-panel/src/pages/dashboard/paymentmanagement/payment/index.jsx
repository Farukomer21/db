import { lazy, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { GridActionsCellItem } from "@mui/x-data-grid";

import { CONFIG } from "src/global-config";
import { usePaymentManagementListPayments } from "src/actions/paymentManagement";

import { Iconify } from "src/components/iconify";

import { DashboardContent } from "../../../../layouts/dashboard/index.js";
import { useDataObjectContext } from "../../../../components/nav-section/data/context";
import {
  DataObjectApi,
  DataObjectList,
} from "../../../../components/data-object/index.js";
import { useBoolean } from "minimal-shared/hooks";

// ----------------------------------------------------------------------
// TODO: Add the feature to tell the user what crud route need to be created to use add,update and delete

const metadata = {
  title: `Payment data - PaymentManagement module - ${CONFIG.appName}`,
};

const PaymentManagementUpdatePaymentModal = lazy(
  () =>
    import(
      "src/components/modals/paymentmanagement/payment/updatepayment-modal"
    ),
);

const PaymentManagementDeletePaymentModal = lazy(
  () =>
    import(
      "src/components/modals/paymentmanagement/payment/deletepayment-modal"
    ),
);

export default function PaymentManagementPaymentAppPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const openEditDialog = useBoolean();

  const openDeleteDialog = useBoolean();

  const { setField, state } = useDataObjectContext();

  const { searchResults: options, searchLoading: loading } =
    usePaymentManagementListPayments();

  const OnEditClickHandler = (row) => {
    setSelectedPayment(row);
    openEditDialog.onTrue();
  };

  const OnDeleteClickHandler = (row) => {
    setSelectedPayment(row);
    openDeleteDialog.onTrue();
  };

  useEffect(() => {
    setField("name", "Payment");
    setField("selectedApi", null);
    setField("defaultListRouteName", "listpayments");

    setField("createModal", "PaymentManagementCreatePaymentModal");

    setField(
      "repoUrl",
      "https://gitlab.mindbricks.com/db/db-paymentManagement-service.git",
    );

    setField("cruds", [
      {
        name: "CreatePayment",
        method: "CREATE",
        color: "success",
        componentName: "PaymentManagementCreatePaymentApiPage",
      },

      {
        name: "UpdatePayment",
        method: "UPDATE",
        color: "info",
        componentName: "PaymentManagementUpdatePaymentApiPage",
      },

      {
        name: "DeletePayment",
        method: "DELETE",
        color: "error",
        componentName: "PaymentManagementDeletePaymentApiPage",
      },

      {
        name: "GetPayment",
        method: "GET",
        color: "primary",
        componentName: "PaymentManagementGetPaymentApiPage",
      },

      {
        name: "ListPayments",
        method: "LIST",
        color: "primary",
        componentName: "PaymentManagementListPaymentsApiPage",
      },
    ]);
    return () => {
      setField("repoUrl", null);
    };
  }, [setField]);

  const columns = [
    { field: "reservationId", headerName: "reservationId", flex: 1 },

    { field: "amount", headerName: "amount", flex: 1 },

    { field: "paymentStatus", headerName: "paymentStatus", flex: 1 },

    { field: "paymentMethod", headerName: "paymentMethod", flex: 1 },

    { field: "gatewayReference", headerName: "gatewayReference", flex: 1 },

    { field: "processedAt", headerName: "processedAt", flex: 1 },
    {
      type: "actions",
      field: "actions",
      headerName: "Actions",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Update"
          onClick={() => OnEditClickHandler(params.row)}
        />,

        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => OnDeleteClickHandler(params.row)}
          sx={{ color: "error.main" }}
        />,
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        {state.display === "List" ? (
          <DataObjectList columns={columns} rows={options} />
        ) : (
          <DataObjectApi />
        )}
      </DashboardContent>

      <PaymentManagementUpdatePaymentModal
        openDialog={openEditDialog}
        selectedPayment={selectedPayment}
      />

      <PaymentManagementDeletePaymentModal
        openDialog={openDeleteDialog}
        selectedId={selectedPayment?.id}
      />
    </>
  );
}
