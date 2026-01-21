/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  Send,
  AlertCircle,
  CheckCircle,
  Building2,
  Upload,
  Download,
} from "lucide-react";
import {
  initialEntityState,
  STORAGE_KEY,
} from "@/constants/createEntityConstants";
import { validations } from "@/utilities/validations";
import EntityForm from "./EntityForms";
import { useAdminAddEstablishment } from "@/services/establishments/mutation";
import { Alerts, useAlert } from "next-alert";
import { CustomSpinner } from "../general/CustomSpinner";

const BulkEntityRegistration = () => {
  const [entities, setEntities] = useState([
    { ...initialEntityState, id: Date.now() },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [errors, setErrors] = useState<any>({});

  const { addAlert } = useAlert();

  const { mutate: adminAddsEstablishment, isPending: isLoadingCreate } =
    useAdminAddEstablishment();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setEntities(parsed);
          setSaveStatus("Loaded saved data");
          setTimeout(() => setSaveStatus(""), 3000);
        }
      } catch (e) {
        console.error("Error loading saved data:", e);
      }
    }
  }, []);

  // Auto-save to localStorage whenever entities change
  useEffect(() => {
    if (entities.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
    }
  }, [entities]);

  const addEntity = () => {
    setEntities([...entities, { ...initialEntityState, id: Date.now() }]);
    // Scroll to bottom to show new entity
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const removeEntity = (id: string) => {
    if (entities.length > 1) {
      setEntities(entities.filter((e: any) => e.id !== id));
    }
  };

  const updateEntity = (id: string, field: string, value: any) => {
    setEntities(
      entities.map((e: any) => (e.id === id ? { ...e, [field]: value } : e))
    );
    // Clear error for this field
    setErrors((prev: any) => {
      const newErrors = { ...prev };
      delete newErrors[`${id}-${field}`];
      return newErrors;
    });
  };

  const handleArrayChange = (
    id: string,
    field: string,
    option: string,
    checked: boolean
  ) => {
    setEntities(
      entities.map((e: any) => {
        if (e.id === id) {
          const currentArray = e[field] || [];
          const newArray = checked
            ? [...currentArray, option]
            : currentArray.filter((item: string) => item !== option);
          return { ...e, [field]: newArray };
        }
        return e;
      })
    );
  };

  const handleOtherInputChange = (id: string, field: string, value: string) => {
    setEntities(
      entities.map((e: any) => {
        if (e.id === id) {
          return { ...e, [`${field}Other`]: value };
        }
        return e;
      })
    );
  };

  const validateEntity = (entity: any) => {
    const newErrors: any = {};

    // Common validations
    if (!entity.entityType) newErrors[`${entity.id}-entityType`] = "Required";
    if (!entity.businessName)
      newErrors[`${entity.id}-businessName`] = "Required";

    const phoneError = validations.nigerianPhone(entity.businessPhoneNumber);
    if (phoneError) newErrors[`${entity.id}-businessPhoneNumber`] = phoneError;

    if (!entity.address) newErrors[`${entity.id}-address`] = "Required";
    if (!entity.localGovernment)
      newErrors[`${entity.id}-localGovernment`] = "Required";

    if (entity.hasWebsite && entity.website) {
      const websiteError = validations.website(entity.website);
      if (websiteError) newErrors[`${entity.id}-website`] = websiteError;
    }

    const yearError = validations.year(entity.yearEstablished?.toString());
    if (yearError) newErrors[`${entity.id}-yearEstablished`] = yearError;

    if (!entity.contactName) newErrors[`${entity.id}-contactName`] = "Required";

    const contactPhoneError = validations.nigerianPhone(
      entity.contactPhoneNumber
    );
    if (contactPhoneError)
      newErrors[`${entity.id}-contactPhoneNumber`] = contactPhoneError;

    const contactEmailError = validations.email(entity.contactEmail);
    if (contactEmailError)
      newErrors[`${entity.id}-contactEmail`] = contactEmailError;

    const businessEmailError = validations.email(entity.businessEmail);
    if (businessEmailError)
      newErrors[`${entity.id}-businessEmail`] = businessEmailError;

    // Entity-specific validations
    if (entity.entityType === "hotel") {
      const roomCountError = validations.number(entity.roomCount);
      if (roomCountError) newErrors[`${entity.id}-roomCount`] = roomCountError;

      const bedSpacesError = validations.number(entity.bedSpaces);
      if (bedSpacesError) newErrors[`${entity.id}-bedSpaces`] = bedSpacesError;
    }

    if (["restaurant", "bar", "lounge"].includes(entity.entityType)) {
      const seatingError = validations.number(entity.seatingCapacity);
      if (seatingError)
        newErrors[`${entity.id}-seatingCapacity`] = seatingError;
    }

    return newErrors;
  };

  const handleSubmit = async () => {
      const allErrors = {};
      entities.forEach((entity) => {
          const entityErrors = validateEntity(entity);
          Object.assign(allErrors, entityErrors);
        });
        console.log('errors',allErrors);

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setSaveStatus("Please fix validation errors");
      setTimeout(() => setSaveStatus(""), 3000);
      return;
    }

    setSubmitting(true);
    setSaveStatus("");

    try {
      // Prepare data for submission - matching user registration format
      const payload = entities.map(
        ({ id, facilitiesOther, serviceTypesOther, ...entity }) => {
          const baseData = {
            ...entity,
            roomCount: entity.roomCount ? Number(entity.roomCount) : null,
            bedSpaces: entity.bedSpaces ? Number(entity.bedSpaces) : null,
            seatingCapacity: entity.seatingCapacity
              ? Number(entity.seatingCapacity)
              : null,
            yearEstablished: Number(entity.yearEstablished),
            submittedAt: new Date().toISOString(),
          };

          // Process other options
          if (facilitiesOther?.trim()) {
            baseData.facilities = [
              ...(entity.facilities || []),
              facilitiesOther.trim(),
            ];
          }

          if (serviceTypesOther?.trim()) {
            baseData.serviceTypes = [
              ...(entity.serviceTypes || []),
              serviceTypesOther.trim(),
            ];
          }

          return baseData;
        }
      );

      adminAddsEstablishment(
        {
          establishments: payload,
        },
        {
          onSuccess: () => {
            addAlert("Success", "Process Successful", "success");
            localStorage.removeItem(STORAGE_KEY);
            setEntities([{ ...initialEntityState, id: Date.now() }]);
            setSaveStatus("Successfully registered all entities!");
            setTimeout(() => setSaveStatus(""), 5000);
          },
          onError: (error) => {
            console.error("Error adding entity:", error);
            addAlert(
              "Error",
              error?.response?.data?.message ||
                "An error occurred while adding establishments, please try again. If error persists, please contact IT Team.",
              "error"
            );
          },
        }
      );
    } catch (error) {
      console.error("Submission error:", error);
      setSaveStatus("Error submitting registrations. Please try again.");
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to clear all unsaved data?")) {
      localStorage.removeItem(STORAGE_KEY);
      setEntities([{ ...initialEntityState, id: Date.now() }]);
      setErrors({});
      setSaveStatus("Data cleared");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(entities, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `entities-backup-${Date.now()}.json`;
    link.click();
  };

  return (
    <div className="pt-16 pb-24">
      {" "}
      {/* Increased bottom padding for floating buttons */}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
          Entity Registration
        </h1>
        <p className="text-[#78716e]">
          Register multiple hospitality establishments at once. Data is
          automatically saved.
        </p>
      </div>
      {/* Status Bar */}
      {saveStatus && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            saveStatus.includes("Error") || saveStatus.includes("fix")
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-green-50 border-green-200 text-green-800"
          } flex items-center gap-2`}
        >
          {saveStatus.includes("Error") || saveStatus.includes("fix") ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span>{saveStatus}</span>
        </div>
      )}
      {/* Action Buttons - Main section */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={addEntity}
          disabled={submitting || isLoadingCreate}
          className={`px-4 py-2 ${
            submitting || isLoadingCreate ? "bg-gray-500" : "bg-[#00563b]"
          } text-white rounded-lg hover:bg-[#004430] transition-colors flex items-center gap-2`}
        >
          <Plus className="w-4 h-4" />
          Add Entity
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting || isLoadingCreate}
          className={`px-4 py-2 ${
            submitting || isLoadingCreate ? "bg-gray-500" : "bg-[#e77818]"
          } text-white rounded-lg hover:bg-[#d16d15] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {submitting || isLoadingCreate ? (
            <CustomSpinner title="Processing" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              {`Submit All (${entities.length})`}
            </>
          )}
        </button>

        <button
          onClick={exportToJSON}
          className="px-4 py-2 bg-white border-2 border-[#e9e1d7] text-[#2a2523] rounded-lg hover:border-[#00563b] hover:bg-[#00563b]/5 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Backup
        </button>

        <button
          onClick={clearAll}
          className="px-4 py-2 bg-white border-2 border-[#e9e1d7] text-[#dc2626] rounded-lg hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>
      {/* Entity Forms */}
      <div className="space-y-6">
        {entities.map((entity: Record<string, any>, index) => (
          <EntityForm
            key={entity.id}
            entity={entity}
            index={index}
            entitiesCount={entities.length}
            updateEntity={updateEntity}
            handleArrayChange={handleArrayChange}
            handleOtherInputChange={handleOtherInputChange}
            removeEntity={removeEntity}
            errors={errors}
          />
        ))}
      </div>
      {/* Summary */}
      <div className="mt-6 p-4 bg-[#00563b]/5 border border-[#00563b]/20 rounded-lg">
        <p className="text-sm text-[#2a2523]">
          <strong>{entities.length}</strong>{" "}
          {entities.length === 1 ? "entity" : "entities"} ready for
          registration. Data is automatically saved to prevent loss on page
          refresh.
        </p>
      </div>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col sm:flex-row gap-3">
        <button
          onClick={addEntity}
          disabled={submitting || isLoadingCreate}
          className={`px-4 py-3 ${
            submitting || isLoadingCreate ? "bg-gray-500" : "bg-[#00563b]"
          } text-white rounded-lg hover:bg-[#004430] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl`}
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Add Entity</span>
          <span className="sm:hidden">Add</span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting || isLoadingCreate}
          className={`px-4 py-3 ${
            submitting || isLoadingCreate ? "bg-gray-500" : "bg-[#e77818]"
          } text-white rounded-lg hover:bg-[#d16d15] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {submitting || isLoadingCreate ? (
            <CustomSpinner title="Processing" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">
                {`Submit (${entities.length})`}
              </span>
              <span className="sm:hidden">{`Submit ${entities.length}`}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BulkEntityRegistration;
