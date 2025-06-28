import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Pagination,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router";

// Import all components
import AdminHeader from "../../admin/AdminHeader/AdminHeader";
import DashboardStats from "../../admin/DashboardStats/DashboardStats";
import TransactionTable from "../../admin/TransactionTable/TransactionTable";
import TransactionFilters from "../../admin/TransactionFilter/TransactionFilter";
import ActionDialog from "../../admin/ActionDialog/ActionDialog";
import NotificationSnackbar from "../../admin/NotificationSnackbar/NotificationSnackbar";

function AdminPanel() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [page, setPage] = useState("");
  const [totalPages, setTotalPages] = useState("")
  const [transactionType, setTransactionType] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [submitMessage, setSubmitMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    // console.log(token);
    if (!token) {
      navigate("/adminlogin");
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp > Date.now() / 1000) {
          navigate("/adminpanel");
        } else {
          navigate("/adminlogin");
        }
      } catch {
        localStorage.removeItem("admin_token");
      }
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3001/api/admin/alltransactions?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("admin_token"),
      },
    })
      .then(async (res) => {
        const data = await res.json();

        console.log("data_transactions", data.data.transactions);
        console.log("data_pagination", data.data.pagination);

        if (res.ok) {
          setTransactions(data.data.transactions);
          setPage(data.data.pagination.page);
          setTotalPages(data.data.pagination.totalPages);
          setSubmitMessage(data.message);
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        setSubmitMessage(
          `${err.message}.Error fetching all transactions. Redirecting to admin login`
        );
        setTimeout(() => {
          navigate("/adminlogin");
        }, 5000); // 🚀 Redirect here
      })
      .finally(() => {
        setSubmitMessage("");
      });
  }, [navigate, loading, page]);

  useEffect(() => {
    fetch("http://localhost:3001/api/admin/transactions/stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("admin_token"),
      },
    })
      .then(async (res) => {
        console.log("check1");
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setStats(data.data.stats);
        setSubmitMessage("Transactions stats fetched successfully!");
      })
      .catch((error) => {
        setSubmitMessage(`${error.message}.Error fetching transaction stats.`);
      })
      .finally(() => {
        setSubmitMessage("");
      });
  }, [navigate, loading]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleActionClick = (transaction, action) => {
    setSelectedTransaction(transaction);
    setActionType(action);
    setActionDialog(true);
  };

  const handleActionSubmit = async (e) => {
    // e.preventDefault();
    // Simulate API call

    try {
      const response = await fetch(
        `http://localhost:3001/api/admin/transactions/${selectedTransaction._id}/${actionType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("admin_token"),
          },
          body: JSON.stringify({
            remarks: actionType === "approve" ? remarks : null,
            paymentDetails: actionType === "complete" ? paymentDetails : null,
            reason: actionType === "reject" ? remarks : null,
          }),
        }
      );

      const { data, message } = await response.json();

      if (response.ok && selectedTransaction._id === data.transaction._id) {
        const updatedTransactions = transactions.map((t) =>
          t._id === selectedTransaction._id
            ? {
                ...t,
                status:
                  actionType === "approve"
                    ? "PROCESSING"
                    : actionType === "complete"
                    ? "COMPLETED"
                    : "REJECTED",
              }
            : t
        );

        setTransactions(updatedTransactions);

        setSnackbar({
          open: true,
          message: `Transaction ${actionType}d successfully`,
          severity: "success",
        });

        setActionDialog(false);
        setActionType("");
        setRemarks("");
        setSelectedTransaction(null);
        setPaymentDetails("");
      } else {
        console.log(message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleRefresh = () => {
    setLoading((prev) => !prev);
    setSnackbar({
      open: true,
      message: "Data refreshed successfully",
      severity: "success",
    });
  };

  const handleFilter = () => {
    // Simulate filter
    setSnackbar({
      open: true,
      message: "Filters applied successfully",
      severity: "info",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AdminHeader onRefresh={handleRefresh} />

      {submitMessage && <Alert sx={{ m: 2 }}>{submitMessage}</Alert>}

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Dashboard" />
          <Tab label="Transactions" />
          <Tab label="Statistics" />
        </Tabs>

        {currentTab === 0 && (
          <Box>
            <DashboardStats stats={stats} />
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Recent Transactions
              </Typography>
              <TransactionTable
                transactions={transactions}
                onActionClick={handleActionClick}
              />
            </Box>
          </Box>
        )}

        {currentTab === 1 && (
          <Box>
            <TransactionFilters
              transactionType={transactionType}
              setTransactionType={setTransactionType}
              dateRange={dateRange}
              setDateRange={setDateRange}
              onFilter={handleFilter}
            />

            <TransactionTable
              transactions={transactions}
              onActionClick={handleActionClick}
            />

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </Box>
        )}

        {currentTab === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Transaction Statistics
            </Typography>
            <DashboardStats stats={stats} />
          </Box>
        )}
      </Container>

      <ActionDialog
        open={actionDialog}
        onClose={() => setActionDialog(false)}
        actionType={actionType}
        selectedTransaction={selectedTransaction}
        remarks={remarks}
        setRemarks={setRemarks}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        onSubmit={handleActionSubmit}
      />

      <NotificationSnackbar snackbar={snackbar} onClose={handleSnackbarClose} />
    </Box>
  );
}

export default AdminPanel;
