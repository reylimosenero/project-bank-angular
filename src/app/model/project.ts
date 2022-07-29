export interface Project {
  id?: number;
  clientName: string;
  projectName: string;
  uom: string;
  quantity: number;
  status:string;
  dateInquiry:string;
  dateTimeStarted:string;
  dateTimeDelivered:string;
}

// private Integer id;

// private String projectName;
// private String clientName;
// private String uom;
// private double quantity;
// private String status;

// @JsonFormat(pattern="yyyy-MM-dd")
// private LocalDate dateInquiry;

// @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
// private LocalDateTime dateTimeStarted;
// @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
// private LocalDateTime dateTimeDelivered;
